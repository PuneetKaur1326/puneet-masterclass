import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const { registrationId, fullName, email, phone } = await req.json();

    if (!registrationId) {
      return NextResponse.json(
        { error: 'Missing registrationId' },
        { status: 400 }
      );
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Razorpay credentials not configured' },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Enforce 9900 paise strictly on the server
    const options = {
      amount: "9900",
      currency: "INR",
      receipt: registrationId,
      notes: {
        registrationId: registrationId,
        fullName: fullName || "",
        email: email || "",
        phone: phone || ""
      }
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(
      { order_id: order.id, amount: order.amount, currency: order.currency },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Razorpay Create Order Error:', error);
    if (error.statusCode === 401) {
      return NextResponse.json(
        { error: 'Authentication failed with Razorpay' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
