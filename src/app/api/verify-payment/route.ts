import { NextResponse } from "next/server";
import crypto from "crypto";
import { MetaWhatsAppService } from "@/services/whatsapp/meta";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

async function getRegistration(registrationId: string) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/registrations?registration_id=eq.${encodeURIComponent(
      registrationId
    )}&select=*`,
    {
      method: "GET",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `Supabase registration lookup failed: ${response.status} ${error}`
    );
  }

  const registrations = await response.json();

  return registrations?.[0] || null;
}

async function updateRegistration(
  registrationId: string,
  data: Record<string, any>
) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/registrations?registration_id=eq.${encodeURIComponent(
      registrationId
    )}`,
    {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        ...data,
        updated_at: new Date().toISOString(),
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `Supabase registration update failed: ${response.status} ${error}`
    );
  }
}

export async function POST(req: Request) {
  const requestId =
    Math.random().toString(36).substring(2, 10);

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

    // --------------------------------------------------
    // STEP 1 — Validate request
    // --------------------------------------------------

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !registrationId ||
      !phone
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // STEP 2 — Verify Razorpay signature
    // --------------------------------------------------

    const razorpaySecret =
      process.env.RAZORPAY_KEY_SECRET;

    if (!razorpaySecret) {
      console.error(
        `[Payment ${requestId}] RAZORPAY_KEY_SECRET missing`
      );

      return NextResponse.json(
        {
          success: false,
          error: "Server misconfiguration",
        },
        { status: 500 }
      );
    }

    const signatureBody =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(signatureBody)
      .digest("hex");

    if (
      expectedSignature !== razorpay_signature
    ) {
      console.error(
        `[Payment ${requestId}] Invalid Razorpay signature`
      );

      return NextResponse.json(
        {
          success: false,
          error: "Payment verification failed",
        },
        { status: 400 }
      );
    }

    console.log(
      `[Payment ${requestId}] Razorpay payment verified`
    );

    // --------------------------------------------------
    // STEP 3 — Find registration in Supabase
    // --------------------------------------------------

    const registration =
      await getRegistration(registrationId);

    if (!registration) {
      console.error(
        `[Payment ${requestId}] Registration not found: ${registrationId}`
      );

      return NextResponse.json(
        {
          success: false,
          error: "Registration not found",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // STEP 4 — Mark payment as Paid
    // --------------------------------------------------

    await updateRegistration(
      registrationId,
      {
        payment_status: "Paid",
        razorpay_order_id,
        razorpay_payment_id,
        payment_timestamp:
          new Date().toISOString(),
      }
    );

    console.log(
      `[Payment ${requestId}] Supabase payment status updated`
    );

    // --------------------------------------------------
    // STEP 5 — Prevent duplicate confirmation
    // --------------------------------------------------

    if (
      registration.whatsapp_status === "Sent" &&
      registration.whatsapp_message_id
    ) {
      console.log(
        `[Payment ${requestId}] WhatsApp confirmation already sent`
      );

      return NextResponse.json({
        success: true,
        paymentVerified: true,
        whatsappStatus: "Already Sent",
      });
    }

    // --------------------------------------------------
    // STEP 6 — Send WhatsApp payment confirmation
    // --------------------------------------------------

    let whatsappStatus = "Failed";
    let whatsappMessageId: string | null = null;

    try {
      const whatsappResult =
        await MetaWhatsAppService.sendConfirmation(
          phone,
          name || registration.full_name || "Attendee",
          amount || "₹99"
        );

      if (whatsappResult?.success) {
        whatsappStatus = "Sent";
        whatsappMessageId =
          whatsappResult.messageId || null;

        console.log(
          `[Payment ${requestId}] WhatsApp confirmation sent`
        );
      } else {
        console.error(
          `[Payment ${requestId}] WhatsApp confirmation failed:`,
          whatsappResult?.error
        );
      }
    } catch (error: any) {
      console.error(
        `[Payment ${requestId}] WhatsApp error:`,
        error
      );
    }

    // --------------------------------------------------
    // STEP 7 — Save WhatsApp status in Supabase
    // --------------------------------------------------

    await updateRegistration(
      registrationId,
      {
        whatsapp_status: whatsappStatus,
        whatsapp_message_id:
          whatsappMessageId || null,
      }
    );

    // --------------------------------------------------
    // STEP 8 — Return success
    // --------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        paymentVerified: true,
        whatsappStatus,
        whatsappMessageId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      `[Payment ${requestId}] Fatal error:`,
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
