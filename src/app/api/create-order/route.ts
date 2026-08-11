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

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { 
          error: 'Razorpay credentials not configured.',
          missingKeyId: !keyId,
          missingKeySecret: !keySecret 
        },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
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
