import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY!;
const META_VERIFY_TOKEN = process.env.META_VERIFY_TOKEN!;
const META_APP_SECRET = process.env.META_APP_SECRET!;

async function supabaseRequest(
  table: string,
  options: {
    method?: string;
    body?: unknown;
    query?: string;
    prefer?: string;
  } = {}
) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}${options.query || ""}`,
    {
      method: options.method || "GET",
      headers: {
        apikey: SUPABASE_SECRET_KEY,
        Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
        "Content-Type": "application/json",
        ...(options.prefer
          ? { Prefer: options.prefer }
          : {}),
      },
      body: options.body
        ? JSON.stringify(options.body)
        : undefined,
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Supabase ${response.status}: ${errorText}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Meta webhook verification
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (
    mode === "subscribe" &&
    token === META_VERIFY_TOKEN &&
    challenge
  ) {
    return new NextResponse(challenge, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return NextResponse.json(
    { error: "Verification failed" },
    { status: 403 }
  );
}

// Verify that POST requests really came from Meta
async function verifyMetaSignature(
  request: NextRequest,
  rawBody: string
) {
  if (!META_APP_SECRET) {
    return true;
  }

  const signature =
    request.headers.get("x-hub-signature-256");

  if (!signature) {
    return false;
  }

  const expected =
    "sha256=" +
    crypto
      .createHmac("sha256", META_APP_SECRET)
      .update(rawBody)
      .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    );
  } catch {
    return false;
  }
}

// Receive WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    const isValid = await verifyMetaSignature(
      request,
      rawBody
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const body = JSON.parse(rawBody);

    if (body.object !== "whatsapp_business_account") {
      return NextResponse.json(
        { received: true },
        { status: 200 }
      );
    }

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        const value = change.value;

        if (!value?.messages) {
          continue;
        }

        const contacts = value.contacts || [];

        for (const message of value.messages) {
          const phoneNumber = message.from;

          if (!phoneNumber || !message.id) {
            continue;
          }

          const contact = contacts.find(
            (c: any) => c.wa_id === phoneNumber
          );

          const displayName =
            contact?.profile?.name || phoneNumber;

          let messageText: string | null = null;

          if (message.type === "text") {
            messageText = message.text?.body || null;
          } else if (message.type === "button") {
            messageText =
              message.button?.text || null;
          } else if (message.type === "interactive") {
            messageText =
              message.interactive?.button_reply?.title ||
              message.interactive?.list_reply?.title ||
              null;
          }

          // Create/update conversation
          const conversationRows =
            await supabaseRequest(
              "whatsapp_conversations",
              {
                method: "POST",
                query: "?on_conflict=phone_number",
                prefer:
                  "resolution=merge-duplicates,return=representation",
                body: {
                  phone_number: phoneNumber,
                  display_name: displayName,
                  last_message:
                    messageText ||
                    `[${message.type} message]`,
                  last_message_at: new Date(
                    Number(message.timestamp) * 1000
                  ).toISOString(),
                  unread_count: 1,
                },
              }
            );

          const conversation =
            conversationRows?.[0];

          if (!conversation?.id) {
            throw new Error(
              "Could not create WhatsApp conversation"
            );
          }

          // Save message
          await supabaseRequest(
            "whatsapp_messages",
            {
              method: "POST",
              query:
                "?on_conflict=whatsapp_message_id",
              prefer:
                "resolution=merge-duplicates,return=minimal",
              body: {
                conversation_id:
                  conversation.id,
                direction: "inbound",
                message_type:
                  message.type || "text",
                message_text: messageText,
                whatsapp_message_id:
                  message.id,
                status: "received",
                raw_payload: message,
              },
            }
          );
        }
      }
    }

    return NextResponse.json(
      { received: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "WhatsApp webhook error:",
      error
    );

    // Return 200 to Meta so it doesn't repeatedly
    // resend the same webhook while we investigate.
    return NextResponse.json(
      { received: true },
      { status: 200 }
    );
  }
}
