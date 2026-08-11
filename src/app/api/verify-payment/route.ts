import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { MetaWhatsAppService } from '@/services/whatsapp/meta';

// Helper: POST to Google Sheets webhook safely
async function callSheetWebhook(payload: object, label: string): Promise<{ ok: boolean; body: any }> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!webhookUrl) {
    return { ok: false, body: { error: 'GOOGLE_SHEET_WEBHOOK not configured' } };
  }
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    let body: any;
    try { body = JSON.parse(text); } catch { body = text; }
    console.log(`[SHEET WEBHOOK - ${label}] HTTP ${res.status}:`, body);
    return { ok: res.ok, body };
  } catch (err: any) {
    console.error(`[SHEET WEBHOOK - ${label}] Network error:`, err.message);
    return { ok: false, body: { error: err.message } };
  }
}

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).substring(7);
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      registrationId,
      phone,
      name,
      amount,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ── STEP 1: Verify Razorpay Signature ─────────────────────────────────────
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error(`[VERIFY - ${requestId}] RAZORPAY_KEY_SECRET not configured.`);
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.error(`[VERIFY - ${requestId}] Invalid signature.`);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log(`[VERIFY - ${requestId}] Signature OK for payment ${razorpay_payment_id}.`);

    // ── STEP 2: Update Google Sheets — payment_update ─────────────────────────
    let sheetPaymentDiag: any = { sent: false };
    if (!registrationId) {
      sheetPaymentDiag = { sent: false, error: 'registrationId missing from request' };
    } else {
      const paymentTimestamp = new Date().toISOString();
      const sheetPayload = {
        action: 'payment_update',
        registrationId,
        paymentStatus: 'Paid',
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        paymentTimestamp,
      };
      console.log(`[VERIFY - ${requestId}] Calling sheet webhook: payment_update for ${registrationId}`);
      const result = await callSheetWebhook(sheetPayload, `payment_update-${requestId}`);
      sheetPaymentDiag = { sent: true, ok: result.ok, response: result.body };
    }

    // ── STEP 3: Send WhatsApp Confirmation ────────────────────────────────────
    let waDiag: any = { triggered: false };
    try {
      console.log(`[VERIFY - ${requestId}] Triggering WhatsApp to ${phone.slice(0, 6)}****...`);
      const waResult = await MetaWhatsAppService.sendConfirmation(phone, name || 'User', amount || '₹1');
      if (waResult) {
        waDiag = {
          triggered: true,
          success: waResult.success,
          httpStatus: waResult.httpStatus || null,
          messageId: waResult.messageId || null,
          error: waResult.error || null,
        };
      } else {
        waDiag = { triggered: true, success: false, error: 'sendConfirmation returned null' };
      }
    } catch (waError: any) {
      console.error(`[VERIFY - ${requestId}] WhatsApp failed:`, waError.message);
      waDiag = { triggered: true, success: false, error: waError.message };
    }

    // ── STEP 4: Update Google Sheets — whatsapp_update ────────────────────────
    let sheetWaDiag: any = { sent: false };
    if (registrationId && waDiag.triggered) {
      const waPayload = {
        action: 'whatsapp_update',
        registrationId,
        whatsappStatus: waDiag.success ? 'Sent' : 'Failed',
        whatsappMessageId: waDiag.messageId || '',
      };
      console.log(`[VERIFY - ${requestId}] Calling sheet webhook: whatsapp_update for ${registrationId}`);
      const result = await callSheetWebhook(waPayload, `whatsapp_update-${requestId}`);
      sheetWaDiag = { sent: true, ok: result.ok, response: result.body };
    }

    return NextResponse.json({
      success: true,
      diagnostics: {
        paymentVerified: true,
        sheetPaymentUpdate: sheetPaymentDiag,
        whatsappTriggered: waDiag.triggered,
        whatsappSuccess: waDiag.success,
        whatsappHttpStatus: waDiag.httpStatus,
        whatsappMessageId: waDiag.messageId,
        whatsappError: waDiag.error,
        sheetWhatsappUpdate: sheetWaDiag,
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error(`[VERIFY - ${requestId}] Unhandled error:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
