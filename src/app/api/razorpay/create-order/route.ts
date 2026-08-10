import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR', receipt = 'receipt#1' } = await req.json();

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: 'Amount must be at least 100 paise' },
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

    const options = {
      amount: amount.toString(), // razorpay takes string/number
      currency,
      receipt,
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
