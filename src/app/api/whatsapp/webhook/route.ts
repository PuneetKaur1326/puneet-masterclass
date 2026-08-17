import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY!;
const META_VERIFY_TOKEN = process.env.META_VERIFY_TOKEN!;
const META_APP_SECRET = process.env.META_APP_SECRET!;

async function supabaseRequest(
  path: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_SECRET_KEY,
      Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(
      `Supabase error ${response.status}: ${text}`
    );
  }

  return text ? JSON.parse(text) : null;
}

/**
 * WhatsApp webhook verification
 */
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
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json(
    { error: "Verification failed" },
    { status: 403 }
  );
}

/**
 * Validate that the webhook really came from Meta
 */
function isValidMetaSignature(
  rawBody: string,
  signature: string | null
) {
  if (!signature || !META_APP_SECRET) {
    return false;
  }

  const expectedSignature =
    "sha256=" +
    crypto
      .createHmac("sha256", META_APP_SECRET)
      .update(rawBody)
      .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

/**
 * Receive WhatsApp messages
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    const signature = request.headers.get(
      "x-hub-signature-256"
    );

    if (!isValidMetaSignature(rawBody, signature)) {
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

    const entries = body.entry || [];

    for (const entry of entries) {
      const changes = entry.changes || [];

      for (const change of changes) {
        const value = change.value;

        if (!value) continue;

        /*
         * WhatsApp sends both messages and status updates
         * through this webhook.
         */

        const messages = value.messages || [];
        const contacts = value.contacts || [];

        for (const message of messages) {
          const phoneNumber = message.from;

          if (!phoneNumber) continue;

          const contact = contacts.find(
            (item: any) => item.wa_id === phoneNumber
          );

          const displayName =
            contact?.profile?.name ||
            phoneNumber;

          let messageType = message.type || "unknown";
          let messageText = "";

          if (message.type === "text") {
            messageText = message.text?.body || "";
          } else if (message.type === "button") {
            messageText =
              message.button?.text ||
              "";
          } else if (message.type === "interactive") {
            messageText =
              message.interactive?.button_reply?.title ||
              message.interactive?.list_reply?.title ||
              "";
          } else if (message.type === "image") {
            messageText =
              message.image?.caption ||
              "[Image]";
          } else if (message.type === "video") {
            messageText =
              message.video?.caption ||
              "[Video]";
          } else if (message.type === "audio") {
            messageText = "[Audio]";
          } else if (message.type === "document") {
            messageText =
              message.document?.filename ||
              "[Document]";
          } else if (message.type === "location") {
            messageText = "[Location]";
          } else {
            messageText = `[${message.type}]`;
          }

          /*
           * Find existing conversation
           */
          const existing = await supabaseRequest(
            `whatsapp_conversations?phone_number=eq.${encodeURIComponent(
              phoneNumber
            )}&select=id,unread_count`
          );

          let conversationId: string;

          if (existing && existing.length > 0) {
            conversationId = existing[0].id;

            const currentUnread =
              existing[0].unread_count || 0;

            await supabaseRequest(
              `whatsapp_conversations?id=eq.${conversationId}`,
              {
                method: "PATCH",
                headers: {
                  Prefer: "return=minimal",
                },
                body: JSON.stringify({
                  display_name: displayName,
                  last_message: messageText,
                  last_message_at: new Date().toISOString(),
                  unread_count: currentUnread + 1,
                  updated_at: new Date().toISOString(),
                }),
              }
            );
          } else {
            const created = await supabaseRequest(
              "whatsapp_conversations",
              {
                method: "POST",
                headers: {
                  Prefer: "return=representation",
                },
                body: JSON.stringify({
                  phone_number: phoneNumber,
                  display_name: displayName,
                  last_message: messageText,
                  last_message_at: new Date().toISOString(),
                  unread_count: 1,
                }),
              }
            );

            if (!created || !created[0]) {
              throw new Error(
                "Could not create WhatsApp conversation"
              );
            }

            conversationId = created[0].id;
          }

          /*
           * Save the individual WhatsApp message
           */
          await supabaseRequest(
            "whatsapp_messages",
            {
              method: "POST",
              headers: {
                Prefer: "return=minimal",
              },
              body: JSON.stringify({
                conversation_id: conversationId,
                direction: "inbound",
                message_type: messageType,
                message_text: messageText,
                whatsapp_message_id: message.id || null,
                status: "received",
                status_updated_at:
                  new Date().toISOString(),
                raw_payload: message,
              }),
            }
          );
        }

        /*
         * Handle WhatsApp message status updates
         */
        const statuses = value.statuses || [];

        for (const status of statuses) {
          if (!status.id) continue;

          await supabaseRequest(
            `whatsapp_messages?whatsapp_message_id=eq.${encodeURIComponent(
              status.id
            )}`,
            {
              method: "PATCH",
              headers: {
                Prefer: "return=minimal",
              },
              body: JSON.stringify({
                status: status.status,
                status_updated_at:
                  new Date().toISOString(),
                raw_status: status,
              }),
            }
          );
        }
      }
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("WhatsApp webhook error:", error);

    /*
     * Return 200 so Meta does not repeatedly retry
     * malformed/non-critical webhook events forever.
     */
    return NextResponse.json(
      {
        success: false,
        error: "Webhook processing failed",
      },
      { status: 200 }
    );
  }
}
