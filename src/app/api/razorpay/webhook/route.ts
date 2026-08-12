import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { submitRegistration } from '@/lib/googleSheets';
import { MetaWhatsAppService } from '@/services/whatsapp/meta';


const processedWebhookEvents = new Set<string>();

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).substring(7);
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing Razorpay signature' }, { status: 400 });
    }

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error(`[RAZORPAY WEBHOOK - ${requestId}] CRITICAL ERROR: RAZORPAY_WEBHOOK_SECRET is not configured.`);
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // Verify Webhook Signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.error(`[RAZORPAY WEBHOOK - ${requestId}] Invalid signature.`);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // Idempotency check for the event
    if (processedWebhookEvents.has(event.id)) {
      console.log(`[RAZORPAY WEBHOOK - ${requestId}] Event ${event.id} already processed. Skipping.`);
      return NextResponse.json({ success: true, message: 'Already processed' }, { status: 200 });
    }

    processedWebhookEvents.add(event.id);

    console.log(`[RAZORPAY WEBHOOK - ${requestId}] Received verified event: ${event.event}`);

    // Handle successful payment events
    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      const paymentEntity = event.event === 'payment.captured' ? event.payload.payment.entity : event.payload.order.entity;
      const razorpay_payment_id = event.event === 'payment.captured' ? paymentEntity.id : null; 
      const phone = paymentEntity.contact;
      const email = paymentEntity.email;
      const name = paymentEntity.notes?.fullName || "";
      const registrationId = paymentEntity.notes?.registrationId;

      if (registrationId) {
        const updateResponse = await submitRegistration({
          action: 'payment_update',
          registrationId,
          paymentStatus: 'Paid',
          razorpayOrderId: event.payload.payment?.entity?.order_id || event.payload.order?.entity?.id || '',
          razorpayPaymentId: razorpay_payment_id || '',
          paymentTimestamp: new Date().toISOString(),
          phone: paymentEntity.contact || '' // kept for typescript compatibility in submitRegistration
        }, requestId);

        if (!updateResponse.success) {
          console.error(`[RAZORPAY WEBHOOK - ${requestId}] Failed to update Google Sheets payment status:`, updateResponse.message);
        }

        if (name && razorpay_payment_id && phone) {
            try {
              let whatsappStatus = 'Sent';
              let whatsappMessageId = '';
              
              if (!process.env.WHATSAPP_ACCESS_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
                whatsappStatus = 'Failed';
              } else {
                const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
                const decodedName = decodeURIComponent(name);
                const waResult = await MetaWhatsAppService.sendConfirmation(formattedPhone, decodedName, "₹99");
                if (waResult?.success) {
                    whatsappMessageId = waResult.messageId || '';
                } else {
                    whatsappStatus = 'Failed';
                }
              }
              
              await submitRegistration({
                action: 'whatsapp_update',
                registrationId,
                whatsappStatus,
                whatsappMessageId,
                phone: paymentEntity.contact || '' 
              }, requestId);
            } catch (err) {
              console.error(`[RAZORPAY WEBHOOK - ${requestId}] WhatsApp dispatch error:`, err);
            }
        }
      }
    } else if (event.event === 'payment.failed') {
      console.log(`[RAZORPAY WEBHOOK - ${requestId}] Payment failed. No automation triggered.`);
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error(`[RAZORPAY WEBHOOK - ${requestId}] Error:`, error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
