import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const { registrationId, fullName, email, phone } = await req.json();

    if (!registrationId) {
      return NextResponse.json({ error: 'Missing registrationId' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Payment service not configured' }, { status: 500 });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    // Amount is always enforced server-side — never trust client input
    const order = await razorpay.orders.create({
      amount: "9900", // ₹99 in paise
      currency: "INR",
      receipt: registrationId,
      notes: {
        registrationId,
        fullName: fullName || "",
        email: email || "",
        phone: phone || "",
      },
    });

    return NextResponse.json(
      { order_id: order.id, amount: order.amount, currency: order.currency },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.statusCode === 401) {
      return NextResponse.json({ error: 'Authentication failed with payment provider' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
