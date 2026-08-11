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
    console.log(`[VERIFY PAYMENT API - ${requestId}] Triggering Meta WhatsApp API...`);
    let waDiagnostic: any = { triggered: false };
    try {
      const waResult = await MetaWhatsAppService.sendConfirmation(phone, name || "User");
      if (waResult) {
        waDiagnostic = {
          triggered: true,
          success: waResult.success,
          httpStatus: waResult.httpStatus || null,
          messageId: waResult.messageId || null,
          error: waResult.error || null
        };
      } else {
        waDiagnostic = { triggered: true, success: false, error: "sendConfirmation returned null" };
      }
    } catch (waError: any) {
      console.error(`[VERIFY PAYMENT API - ${requestId}] WhatsApp trigger failed:`, waError);
      waDiagnostic = { triggered: true, success: false, error: waError.message };
    }

    return NextResponse.json({ 
      success: true, 
      diagnostics: {
        paymentVerified: true,
        whatsappTriggered: waDiagnostic.triggered,
        whatsappSuccess: waDiagnostic.success,
        whatsappHttpStatus: waDiagnostic.httpStatus,
        whatsappMessageId: waDiagnostic.messageId,
        whatsappError: waDiagnostic.error
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error(`[VERIFY PAYMENT API - ${requestId}] Error:`, error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
