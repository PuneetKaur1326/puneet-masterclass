import { NextResponse } from 'next/server';
import { PhonePeService } from '@/services/phonepe/phonepe';
import { submitRegistration } from '@/lib/googleSheets';
import { MetaWhatsAppService } from '@/services/whatsapp/meta';
import { EmailService } from '@/services/emails/resend';

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).substring(7);
  try {
    const url = new URL(req.url);
    const phone = url.searchParams.get('p');
    const name = url.searchParams.get('n');
    const email = url.searchParams.get('e');

    console.log(`[CALLBACK API - ${requestId}] Webhook received for phone: ${phone}`);

    // Validate Environment Variables Before Processing
    if (!process.env.GOOGLE_SHEET_WEBHOOK) {
      console.error(`[CALLBACK API - ${requestId}] CRITICAL ERROR: GOOGLE_SHEET_WEBHOOK is not configured.`);
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const body = await req.json();
    const xVerify = req.headers.get('x-verify') || '';

    // 1. Verify Signature
    const isValid = PhonePeService.verifyCallback(body.response, xVerify);
    if (!isValid) {
      console.error(`[CALLBACK API - ${requestId}] Invalid PhonePe signature. Security check failed.`);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    
    console.log(`[CALLBACK API - ${requestId}] Signature verified successfully`);

    // 2. Decode Payload
    const decodedPayload = JSON.parse(Buffer.from(body.response, 'base64').toString('utf-8'));
    const { code, transactionId } = decodedPayload.data;

    // 3. Determine Status
    const status = code === 'PAYMENT_SUCCESS' ? 'Paid' : 'Failed';
    
    // We need the phone number to identify the row in Google Sheets
    if (!phone) {
      console.error(`[CALLBACK API - ${requestId}] Phone number missing from callback URL parameters`);
      return NextResponse.json({ error: 'Missing identifier' }, { status: 400 });
    }

    console.log(`[CALLBACK API - ${requestId}] Transaction ${transactionId} status is ${status}. Updating Sheets...`);

    // 4. Update Google Sheets
    const updateResponse = await submitRegistration({
      action: 'update',
      phone: `+91${phone}`, // Restore the +91 that we stripped
      paymentStatus: status,
      transactionId: transactionId || '',
    }, requestId);

    if (!updateResponse.success) {
      console.error(`[CALLBACK API - ${requestId}] Failed to update Google Sheets payment status:`, updateResponse.message);
      // We still return 200 so PhonePe doesn't retry endlessly, but log the error.
    } else {
      console.log(`[CALLBACK API - ${requestId}] Successfully updated Sheets payment status.`);
    }

    // 5. Trigger Automations if Success
    if (status === 'Paid' && name) {
      try {
        const decodedName = decodeURIComponent(name);
        let whatsappStatus = 'Sent';
        
        // Dispatch WhatsApp and Email concurrently
        const emailPromise = email ? EmailService.sendConfirmation(decodeURIComponent(email), decodedName) : Promise.resolve(null);
        
        let waResult;
        if (!process.env.META_ACCESS_TOKEN) {
          console.log(`[CALLBACK API - ${requestId}] META_ACCESS_TOKEN missing. Skipping WhatsApp flow.`);
          waResult = { status: 'rejected' };
          whatsappStatus = 'Skipped';
        } else {
          waResult = await MetaWhatsAppService.sendConfirmation(`+91${phone}`, decodedName);
          if (!waResult) {
            waResult = { status: 'rejected' };
          } else {
            waResult = { status: 'fulfilled', value: waResult };
          }
        }

        const [emailResult] = await Promise.allSettled([emailPromise]);

        if (waResult.status === 'rejected' && whatsappStatus !== 'Skipped') {
          console.error(`[CALLBACK API - ${requestId}] WhatsApp automation failed.`);
          whatsappStatus = 'Failed';
        } else if (whatsappStatus !== 'Skipped') {
          console.log(`[CALLBACK API - ${requestId}] WhatsApp automation succeeded.`);
        }

        // 6. Update Google Sheets with WhatsApp Status
        console.log(`[CALLBACK API - ${requestId}] Updating Sheets with WhatsApp status: ${whatsappStatus}`);
        await submitRegistration({
          action: 'update',
          phone: `+91${phone}`,
          whatsappStatus: whatsappStatus,
        }, requestId);
        
      } catch (automationError) {
        console.error(`[CALLBACK API - ${requestId}] Automation dispatch error:`, automationError);
        // Fallback update for failure
        await submitRegistration({
          action: 'update',
          phone: `+91${phone}`,
          whatsappStatus: 'Failed',
        }, requestId);
      }
    }

    console.log(`[CALLBACK API - ${requestId}] Callback processed successfully.`);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(`[CALLBACK API - ${requestId}] Callback Webhook Uncaught Error:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
