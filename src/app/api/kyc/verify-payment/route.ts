import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      fullName,
      email,
      phone,
    } = await req.json();

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !fullName ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        {
          error:
            "Payment details and customer details are required",
        },
        {
          status: 400,
        }
      );
    }

    const keyId =
      process.env.RAZORPAY_KEY_ID;

    const keySecret =
      process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        {
          error:
            "Payment service not configured",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * IMPORTANT:
     *
     * This route is ONLY for the
     * Know Your Customer ₹19 worksheet.
     *
     * It does NOT modify or use the
     * existing ₹99 webinar verification route.
     */

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          keySecret
        )
        .update(
          `${razorpay_order_id}|${razorpay_payment_id}`
        )
        .digest("hex");

    /*
     * Make sure both signatures have the
     * same length before timingSafeEqual.
     */

    if (
      generatedSignature.length !==
      razorpay_signature.length
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid payment signature",
        },
        {
          status: 400,
        }
      );
    }

    const signaturesMatch =
      crypto.timingSafeEqual(
        Buffer.from(
          generatedSignature
        ),
        Buffer.from(
          razorpay_signature
        )
      );

    if (!signaturesMatch) {
      return NextResponse.json(
        {
          error:
            "Invalid payment signature",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Fetch the payment directly from
     * Razorpay after signature verification.
     *
     * This gives us a server-side check
     * of the payment status, amount and
     * currency.
     */

    const razorpay =
      new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

    const payment =
      await razorpay.payments.fetch(
        razorpay_payment_id
      );

    /*
     * Confirm payment belongs to
     * the same Razorpay order.
     */

    if (
      payment.order_id !==
      razorpay_order_id
    ) {
      return NextResponse.json(
        {
          error:
            "Payment does not match the order",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Confirm exact amount.
     *
     * ₹19 = 1900 paise
     */

    if (payment.amount !== 1900) {
      return NextResponse.json(
        {
          error:
            "Invalid payment amount",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Confirm currency.
     */

    if (payment.currency !== "INR") {
      return NextResponse.json(
        {
          error:
            "Invalid payment currency",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Confirm payment is captured.
     */

    if (
      payment.status !== "captured"
    ) {
      return NextResponse.json(
        {
          error:
            "Payment has not been captured yet",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * PAYMENT VERIFIED
     *
     * We are intentionally stopping here.
     *
     * Next we will connect this verified
     * payment to:
     *
     * 1. Customer record
     * 2. PDF delivery
     * 3. WhatsApp message
     * 4. Success page
     */

    console.log(
      "KYC ₹19 payment verified",
      {
        orderId:
          razorpay_order_id,

        paymentId:
          razorpay_payment_id,

        fullName,
        email,
        phone,
      }
    );

    return NextResponse.json(
      {
        success: true,

        product:
          "Know Your Customer Worksheet",

        payment_id:
          razorpay_payment_id,
      },
      {
        status: 200,
      }
    );

  } catch (error: any) {

    console.error(
      "KYC payment verification failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to verify KYC payment",
      },
      {
        status: 500,
      }
    );
  }
}
