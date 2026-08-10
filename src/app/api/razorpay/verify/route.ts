import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { submitRegistration } from '@/lib/googleSheets';
import { MetaWhatsAppService } from '@/services/whatsapp/meta';
import { EmailService } from '@/services/emails/resend';

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
      console.error(`[RAZORPAY VERIFY API - ${requestId}] CRITICAL ERROR: RAZORPAY_KEY_SECRET is not configured.`);
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.error(`[RAZORPAY VERIFY API - ${requestId}] Invalid signature.`);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log(`[RAZORPAY VERIFY API - ${requestId}] Signature verified successfully.`);

    // If phone is provided, update Google Sheets and trigger automations
    if (phone) {
      const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
      
      const updateResponse = await submitRegistration({
        action: 'update',
        phone: formattedPhone,
        paymentStatus: 'Paid',
        transactionId: razorpay_payment_id,
      }, requestId);

      if (!updateResponse.success) {
        console.error(`[RAZORPAY VERIFY API - ${requestId}] Failed to update Google Sheets payment status:`, updateResponse.message);
      } else {
        console.log(`[RAZORPAY VERIFY API - ${requestId}] Successfully updated Sheets payment status.`);
      }

      // Trigger Automations
      if (name) {
        try {
          const decodedName = decodeURIComponent(name);
          let whatsappStatus = 'Sent';
          
          const emailPromise = email ? EmailService.sendConfirmation(decodeURIComponent(email), decodedName) : Promise.resolve(null);
          
          let waResult;
          if (!process.env.META_ACCESS_TOKEN) {
            console.log(`[RAZORPAY VERIFY API - ${requestId}] META_ACCESS_TOKEN missing. Skipping WhatsApp flow.`);
            waResult = { status: 'rejected' };
            whatsappStatus = 'Skipped';
          } else {
            waResult = await MetaWhatsAppService.sendConfirmation(formattedPhone, decodedName);
            if (!waResult) {
              waResult = { status: 'rejected' };
            } else {
              waResult = { status: 'fulfilled', value: waResult };
            }
          }

          const [emailResult] = await Promise.allSettled([emailPromise]);

          if (waResult.status === 'rejected' && whatsappStatus !== 'Skipped') {
            console.error(`[RAZORPAY VERIFY API - ${requestId}] WhatsApp automation failed.`);
            whatsappStatus = 'Failed';
          } else if (whatsappStatus !== 'Skipped') {
            console.log(`[RAZORPAY VERIFY API - ${requestId}] WhatsApp automation succeeded.`);
          }

          console.log(`[RAZORPAY VERIFY API - ${requestId}] Updating Sheets with WhatsApp status: ${whatsappStatus}`);
          await submitRegistration({
            action: 'update',
            phone: formattedPhone,
            whatsappStatus: whatsappStatus,
          }, requestId);
          
        } catch (automationError) {
          console.error(`[RAZORPAY VERIFY API - ${requestId}] Automation dispatch error:`, automationError);
          await submitRegistration({
            action: 'update',
            phone: formattedPhone,
            whatsappStatus: 'Failed',
          }, requestId);
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error(`[RAZORPAY VERIFY API - ${requestId}] Error:`, error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
