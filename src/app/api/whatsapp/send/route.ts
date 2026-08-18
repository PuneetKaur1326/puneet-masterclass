import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { to, message } = await request.json();

    if (!to || !message) {
      return NextResponse.json(
        { error: "Recipient and message are required." },
        { status: 400 }
      );
    }

    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!accessToken || !phoneNumberId) {
      return NextResponse.json(
        { error: "WhatsApp credentials are not configured." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://graph.facebook.com/v25.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to,
          type: "text",
          text: {
            preview_url: false,
            body: message,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("WhatsApp send error:", data);

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "WhatsApp failed to send the message.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      whatsapp_message_id: data?.messages?.[0]?.id || null,
    });
  } catch (error) {
    console.error("WhatsApp send route error:", error);

    return NextResponse.json(
      { error: "Failed to send WhatsApp message." },
      { status: 500 }
    );
  }
}
