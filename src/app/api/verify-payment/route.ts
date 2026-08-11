import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { MetaWhatsAppService } from '@/services/whatsapp/meta';

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).substring(7);
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, phone, name } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Live WhatsApp testing
    console.log(`[VERIFY PAYMENT API - ${requestId}] Triggering Meta WhatsApp API to ${phone}...`);
    try {
      await MetaWhatsAppService.sendConfirmation(phone, name || "User");
    } catch (waError) {
      console.error(`[VERIFY PAYMENT API - ${requestId}] WhatsApp trigger failed:`, waError);
      // We don't fail the whole request just because WhatsApp failed
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
