"use server";

import { z } from "zod";
import { PhonePeService } from "@/services/phonepe/phonepe";

// Server-side validation schema
const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\+91\s?\d{10}$/),
  occupation: z.string().min(2),
  goal: z.string().min(1),
  challenge: z.string().optional(),
});

export async function processRegistration(formData: z.infer<typeof registerSchema>) {
  try {
    // 1. Validate Input
    const validatedData = registerSchema.parse(formData);

    // 2. Generate IDs
    // Extract 10 digit phone for PhonePe
    const cleanPhone = validatedData.phone.replace('+91', '').replace(/\s+/g, '');
    const merchantTransactionId = `MTXN${cleanPhone}${Date.now().toString().slice(-6)}`;
    const WORKSHOP_PRICE = 99; // ₹99
    
    const firstName = validatedData.fullName.split(' ')[0];

    // 3. Initiate PhonePe Payment
    // Note: We encode phone and name in the callback URL so the webhook can retrieve them
    // since we are no longer using a database to persist this state.
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/status?id=${merchantTransactionId}`;
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback?p=${cleanPhone}&n=${encodeURIComponent(firstName)}&e=${encodeURIComponent(validatedData.email)}`;

    if (!process.env.PHONEPE_MERCHANT_ID || process.env.PHONEPE_MERCHANT_ID === "your-merchant-id") {
      console.log("PhonePe credentials missing. Skipping payment flow and redirecting to thank you page.");
      return {
        success: true,
        redirectUrl: `/thank-you`, 
      };
    }

    const phonePeResponse = await PhonePeService.createPayment({
      merchantTransactionId: merchantTransactionId,
      merchantUserId: cleanPhone, // Using phone as userId
      amount: WORKSHOP_PRICE * 100, // PhonePe takes paise
      redirectUrl: redirectUrl,
      redirectMode: 'REDIRECT',
      callbackUrl: callbackUrl,
      mobileNumber: cleanPhone,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    });

    if (phonePeResponse.success) {
      return {
        success: true,
        redirectUrl: phonePeResponse.data.instrumentResponse.redirectInfo.url
      };
    } else {
      throw new Error(phonePeResponse.message || "Failed to generate payment link");
    }

  } catch (error: any) {
    console.error("Action Error:", error);
    return {
      success: false,
      message: error.message || "Something went wrong.",
    };
  }
}
