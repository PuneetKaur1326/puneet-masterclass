import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { submitRegistration } from '@/lib/googleSheets';
import { MetaWhatsAppService } from '@/services/whatsapp/meta';
import { EmailService } from '@/services/emails/resend';

// Idempotency cache: Stores razorpay_payment_id to prevent duplicate actions 
// from rapid retries (e.g., user double-clicking on the frontend).
// Note: This is an in-memory cache and will reset on cold starts, but it's 
// highly effective for immediate duplicate requests.
const processedPayments = new Set<string>();

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).substring(7);
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, phone, email, name } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required signature fields' },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error(`[VERIFY PAYMENT API - ${requestId}] CRITICAL ERROR: RAZORPAY_KEY_SECRET is not configured.`);
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.error(`[VERIFY PAYMENT API - ${requestId}] Invalid signature.`);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log(`[VERIFY PAYMENT API - ${requestId}] Signature verified successfully for payment ${razorpay_payment_id}.`);

    // Idempotency Check
    if (processedPayments.has(razorpay_payment_id)) {
      console.log(`[VERIFY PAYMENT API - ${requestId}] Payment ${razorpay_payment_id} already processed. Skipping duplicate execution.`);
      return NextResponse.json({ success: true, message: 'Already processed' }, { status: 200 });
    }

    // Mark as processed
    processedPayments.add(razorpay_payment_id);

    // If phone is provided, update Google Sheets and trigger automations
    if (phone) {
      // The original code appended +91. We will still do it for Google Sheets storage
      // to keep backward compatibility with how the Sheet is expected.
      // The WhatsApp service itself formats it appropriately for Meta Cloud API.
      const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
      
      const updateResponse = await submitRegistration({
        action: 'update',
        phone: formattedPhone,
        paymentStatus: 'Paid',
        transactionId: razorpay_payment_id,
      }, requestId);

      if (!updateResponse.success) {
        console.error(`[VERIFY PAYMENT API - ${requestId}] Failed to update Google Sheets payment status:`, updateResponse.message);
      } else {
        console.log(`[VERIFY PAYMENT API - ${requestId}] Successfully updated Sheets payment status.`);
      }

      // Trigger Automations
      if (name) {
        try {
          const decodedName = decodeURIComponent(name);
          let whatsappStatus = 'Sent';
          
          const emailPromise = email ? EmailService.sendConfirmation(decodeURIComponent(email), decodedName) : Promise.resolve(null);
          
          let waResult;
          // Check for new WhatsApp Environment Variables
          if (!process.env.WHATSAPP_ACCESS_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
            console.warn(`[VERIFY PAYMENT API - ${requestId}] WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID missing. Skipping WhatsApp flow.`);
            waResult = { status: 'rejected' };
            whatsappStatus = 'Skipped';
          } else {
            // Note: the WhatsApp service takes care of stripping the '+91' internally
            const waResponse = await MetaWhatsAppService.sendConfirmation(formattedPhone, decodedName);
            if (!waResponse) {
              waResult = { status: 'rejected' };
            } else {
              waResult = { status: 'fulfilled', value: waResponse };
            }
          }

          const [emailResult] = await Promise.allSettled([emailPromise]);

          if (waResult.status === 'rejected' && whatsappStatus !== 'Skipped') {
            console.error(`[VERIFY PAYMENT API - ${requestId}] WhatsApp automation failed.`);
            whatsappStatus = 'Failed';
          } else if (whatsappStatus !== 'Skipped') {
            console.log(`[VERIFY PAYMENT API - ${requestId}] WhatsApp automation succeeded.`);
          }

          console.log(`[VERIFY PAYMENT API - ${requestId}] Updating Sheets with WhatsApp status: ${whatsappStatus}`);
          await submitRegistration({
            action: 'update',
            phone: formattedPhone,
            whatsappStatus: whatsappStatus,
          }, requestId);
          
        } catch (automationError) {
          console.error(`[VERIFY PAYMENT API - ${requestId}] Automation dispatch error:`, automationError);
          // Safely attempt to log the failure in sheets
          await submitRegistration({
            action: 'update',
            phone: formattedPhone,
            whatsappStatus: 'Failed',
          }, requestId).catch(() => {});
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error(`[VERIFY PAYMENT API - ${requestId}] Error:`, error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
