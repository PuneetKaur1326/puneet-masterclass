import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { MetaWhatsAppService } from '@/services/whatsapp/meta';

// ── Google Sheets webhook helper ───────────────────────────────────────────
async function callSheetWebhook(payload: object, label: string): Promise<{ ok: boolean; body: any }> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!webhookUrl) return { ok: false, body: { error: 'GOOGLE_SHEET_WEBHOOK not configured' } };
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    let body: any;
    try { body = JSON.parse(text); } catch { body = text; }
    return { ok: res.ok, body };
  } catch (err: any) {
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

    // ── STEP 1: Verify Razorpay Signature ─────────────────────────────────
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    // ── STEP 2: Google Sheets — payment_update ─────────────────────────────
    if (registrationId) {
      await callSheetWebhook({
        action: 'payment_update',
        registrationId,
        paymentStatus: 'Paid',
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        paymentTimestamp: new Date().toISOString(),
      }, `payment_update-${requestId}`);
    }

    // ── STEP 3: Send WhatsApp Confirmation ────────────────────────────────
    let whatsappMessageId: string | null = null;
    let whatsappStatus = 'Failed';
    try {
      const waResult = await MetaWhatsAppService.sendConfirmation(
        phone,
        name || 'Attendee',
        amount || '₹99'
      );
      if (waResult?.success) {
        whatsappStatus = 'Sent';
        whatsappMessageId = waResult.messageId || null;
      }
    } catch {
      whatsappStatus = 'Failed';
    }

    // ── STEP 4: Google Sheets — whatsapp_update ────────────────────────────
    if (registrationId) {
      await callSheetWebhook({
        action: 'whatsapp_update',
        registrationId,
        whatsappStatus,
        whatsappMessageId: whatsappMessageId || '',
      }, `whatsapp_update-${requestId}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
