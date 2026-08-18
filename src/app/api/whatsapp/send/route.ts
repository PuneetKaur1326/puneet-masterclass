import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { to, message, conversationId } = await request.json();

    if (!to || !message || !conversationId) {
      return NextResponse.json(
        {
          error: "Recipient, message and conversationId are required.",
        },
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

    const whatsappResponse = await fetch(
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

    const whatsappData = await whatsappResponse.json();

    if (!whatsappResponse.ok) {
      console.error("WhatsApp send error:", whatsappData);

      return NextResponse.json(
        {
          error:
            whatsappData?.error?.message ||
            "WhatsApp failed to send the message.",
        },
        { status: whatsappResponse.status }
      );
    }

    const whatsappMessageId =
      whatsappData?.messages?.[0]?.id || null;

    const now = new Date().toISOString();

    // Save outbound message
    const messageResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/whatsapp_messages`,
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_SECRET_KEY,
          Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          direction: "outbound",
          message_type: "text",
          message_text: message,
          whatsapp_message_id: whatsappMessageId,
          status: "sent",
          status_updated_at: now,
          created_at: now,
        }),
      }
    );

    if (!messageResponse.ok) {
      const errorText = await messageResponse.text();
      console.error(
        "Failed to save outbound message:",
        errorText
      );

      return NextResponse.json({
        success: true,
        whatsapp_message_id: whatsappMessageId,
        warning: "Message sent but could not be saved to inbox.",
      });
    }

    // Update conversation preview
    const conversationResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/whatsapp_conversations?id=eq.${encodeURIComponent(
        conversationId
      )}`,
      {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_SECRET_KEY,
          Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          last_message: message,
          last_message_at: now,
          updated_at: now,
        }),
      }
    );

    if (!conversationResponse.ok) {
      const errorText = await conversationResponse.text();
      console.error(
        "Failed to update conversation:",
        errorText
      );
    }

    return NextResponse.json({
      success: true,
      whatsapp_message_id: whatsappMessageId,
    });
  } catch (error) {
    console.error("WhatsApp send route error:", error);

    return NextResponse.json(
      { error: "Failed to send WhatsApp message." },
      { status: 500 }
    );
  }
}
