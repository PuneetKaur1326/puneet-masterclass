import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";

const PDF_URL =
  process.env.WHATSAPP_KYC_PDF_URL ||
  "https://www.puneetkaursaluja.com/know-your-customer-worksheet.pdf";

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
          error: "Payment details and customer details are required",
        },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        {
          error: "Payment service not configured",
        },
        { status: 500 }
      );
    }

    // This route is ONLY for the Know Your Customer ₹19 worksheet.
    // The existing ₹99 webinar payment flow is untouched.

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature.length !== razorpay_signature.length) {
      return NextResponse.json(
        {
          error: "Invalid payment signature",
        },
        { status: 400 }
      );
    }

    const signaturesMatch = crypto.timingSafeEqual(
      Buffer.from(generatedSignature),
      Buffer.from(razorpay_signature)
    );

    if (!signaturesMatch) {
      return NextResponse.json(
        {
          error: "Invalid payment signature",
        },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const payment = await razorpay.payments.fetch(
      razorpay_payment_id
    );

    if (payment.order_id !== razorpay_order_id) {
      return NextResponse.json(
        {
          error: "Payment does not match the order",
        },
        { status: 400 }
      );
    }

    // ₹19 = 1900 paise
    if (payment.amount !== 1900) {
      return NextResponse.json(
        {
          error: "Invalid payment amount",
        },
        { status: 400 }
      );
    }

    if (payment.currency !== "INR") {
      return NextResponse.json(
        {
          error: "Invalid payment currency",
        },
        { status: 400 }
      );
    }

    if (payment.status !== "captured") {
      return NextResponse.json(
        {
          error: "Payment has not been captured yet",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // PAYMENT VERIFIED — SEND WORKSHEET ON WHATSAPP
    // --------------------------------------------------

    let whatsappDelivered = false;
    let whatsappError = "";

    const accessToken =
      process.env.WHATSAPP_ACCESS_TOKEN;

    const phoneNumberId =
      process.env.WHATSAPP_PHONE_NUMBER_ID;

    const templateName =
      process.env.WHATSAPP_KYC_TEMPLATE_NAME;

    const templateLanguage =
      process.env.WHATSAPP_KYC_TEMPLATE_LANGUAGE ||
      "en_US";

    if (
      !accessToken ||
      !phoneNumberId ||
      !templateName
    ) {
      whatsappError =
        "WhatsApp KYC template is not configured yet.";

      console.error(whatsappError);
    } else {
      const cleanPhone =
        String(phone).replace(/\D/g, "");

      try {
        const whatsappResponse =
          await fetch(
            `https://graph.facebook.com/v25.0/${phoneNumberId}/messages`,
            {
              method: "POST",

              headers: {
                Authorization:
                  `Bearer ${accessToken}`,

                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                messaging_product:
                  "whatsapp",

                recipient_type:
                  "individual",

                to: cleanPhone,

                type: "template",

                template: {
                  name: templateName,

                  language: {
                    code:
                      templateLanguage,
                  },

                  components: [
                    {
                      type: "header",

                      parameters: [
                        {
                          type: "document",

                          document: {
                            link: PDF_URL,

                            filename:
                              "Know Your Customer Worksheet.pdf",
                          },
                        },
                      ],
                    },

                    {
                      type: "body",

                      parameters: [
                        {
                          type: "text",

                          text:
                            String(
                              fullName
                            ).trim(),
                        },
                      ],
                    },
                  ],
                },
              }),
            }
          );

        const whatsappData =
          await whatsappResponse.json();

        if (!whatsappResponse.ok) {
          whatsappError =
            whatsappData?.error?.message ||
            "WhatsApp delivery failed.";

          console.error(
            "KYC WhatsApp delivery error:",
            whatsappData
          );
        } else {
          whatsappDelivered = true;

          console.log(
            "KYC worksheet delivered on WhatsApp",
            {
              paymentId:
                razorpay_payment_id,

              whatsappMessageId:
                whatsappData?.messages?.[0]?.id ||
                null,
            }
          );
        }
      } catch (error: any) {
        whatsappError =
          error?.message ||
          "WhatsApp delivery failed.";

        console.error(
          "KYC WhatsApp delivery exception:",
          error
        );
      }
    }

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

        whatsappDelivered,
      }
    );

    // Payment remains successful even if WhatsApp
    // delivery needs attention.
    return NextResponse.json(
      {
        success: true,

        product:
          "Know Your Customer Worksheet",

        payment_id:
          razorpay_payment_id,

        whatsapp_delivered:
          whatsappDelivered,

        whatsapp_error:
          whatsappDelivered
            ? undefined
            : whatsappError,
      },
      { status: 200 }
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
      { status: 500 }
    );
  }
}
