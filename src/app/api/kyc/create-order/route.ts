import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone } = await req.json();

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        {
          error: "Name, email and WhatsApp number are required",
        },
        {
          status: 400,
        }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        {
          error: "Payment service not configured",
        },
        {
          status: 500,
        }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    /*
     * KNOW YOUR CUSTOMER WORKSHEET
     *
     * Price: ₹19
     * Razorpay uses paise
     * ₹19 = 1900 paise
     *
     * IMPORTANT:
     * This route is completely separate from
     * the existing ₹99 webinar payment route.
     */

    const receipt = `kyc_${Date.now()}`;

    const order = await razorpay.orders.create({
      amount: 1900,
      currency: "INR",
      receipt: receipt,

      notes: {
        product: "Know Your Customer Worksheet",
        productPrice: "19",
        fullName: fullName,
        email: email,
        phone: phone,
      },
    });

    return NextResponse.json(
      {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: keyId,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(
      "KYC Razorpay order creation failed:",
      error
    );

    if (error?.statusCode === 401) {
      return NextResponse.json(
        {
          error:
            "Authentication failed with payment provider",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      {
        error:
          "Failed to create KYC worksheet order",
      },
      {
        status: 500,
      }
    );
  }
}
