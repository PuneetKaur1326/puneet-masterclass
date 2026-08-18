import ReplyBox from "./ReplyBox";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY!;

type Conversation = {
  id: string;
  phone_number: string;
  display_name: string | null;
  last_message: string | null;
  last_message_at: string | null;
  unread_count: number;
  updated_at: string;
};

type Message = {
  id: string;
  conversation_id: string;
  direction: "inbound" | "outbound" | string;
  message_type: string;
  message_text: string | null;
  whatsapp_message_id: string | null;
  status: string | null;
  created_at: string;
};

async function supabaseRequest(
  path: string,
  options: RequestInit = {}
) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/${path}`,
    {
      ...options,
      headers: {
        apikey: SUPABASE_SECRET_KEY,
        Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Supabase error ${response.status}: ${errorText}`
    );
  }

  return response.json();
}

function formatTime(dateString: string | null) {
  if (!dateString) return "";

  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateString));
}

export default async function WhatsAppInbox({
  searchParams,
}: {
  searchParams: Promise<{ conversation?: string }>;
}) {
  const params = await searchParams;
  const selectedConversationId = params.conversation;

  let conversations: Conversation[] = [];
  let messages: Message[] = [];
  let selectedConversation: Conversation | null = null;

  try {
    conversations = await supabaseRequest(
      "whatsapp_conversations?select=*&order=updated_at.desc"
    );

    if (selectedConversationId) {
      selectedConversation =
        conversations.find(
          (conversation) =>
            conversation.id === selectedConversationId
        ) || null;

      if (selectedConversation) {
        messages = await supabaseRequest(
          `whatsapp_messages?select=*&conversation_id=eq.${encodeURIComponent(
            selectedConversationId
          )}&order=created_at.asc`
        );
      }
    } else if (conversations.length > 0) {
      selectedConversation = conversations[0];

      messages = await supabaseRequest(
        `whatsapp_messages?select=*&conversation_id=eq.${encodeURIComponent(
          conversations[0].id
        )}&order=created_at.asc`
      );
    }
  } catch (error) {
    console.error("WhatsApp Inbox error:", error);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#111827",
      }}
    >
      {/* Header */}
      <header
        style={{
          height: "72px",
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            WhatsApp Inbox
          </h1>

          <p
            style={{
              margin: "4px 0 0",
              fontSize: "13px",
              color: "#6b7280",
            }}
          >
            Manage your WhatsApp conversations
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "#15803d",
          }}
        >
          <span
            style={{
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              background: "#22c55e",
              display: "inline-block",
            }}
          />

          Connected
        </div>
      </header>

      {/* Main inbox */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          height: "calc(100vh - 72px)",
        }}
      >
        {/* Conversation list */}
        <aside
          style={{
            background: "#ffffff",
            borderRight: "1px solid #e5e7eb",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              padding: "18px",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <input
              type="text"
              placeholder="Search conversations..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          {conversations.length === 0 ? (
            <div
              style={{
                padding: "40px 20px",
                textAlign: "center",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              No conversations yet.
            </div>
          ) : (
            conversations.map((conversation) => {
              const isSelected =
                conversation.id === selectedConversation?.id;

              return (
                <a
                  key={conversation.id}
                  href={`/whatsapp-inbox?conversation=${conversation.id}`}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    padding: "16px 18px",
                    borderBottom: "1px solid #f0f0f0",
                    background: isSelected
                      ? "#f0fdf4"
                      : "#ffffff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          background: "#dcfce7",
                          color: "#166534",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {(
                          conversation.display_name ||
                          conversation.phone_number ||
                          "?"
                        )
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div
                        style={{
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: "14px",
                            marginBottom: "4px",
                          }}
                        >
                          {conversation.display_name ||
                            conversation.phone_number}
                        </div>

                        <div
                          style={{
                            fontSize: "12px",
                            color: "#9ca3af",
                            marginBottom: "5px",
                          }}
                        >
                          {conversation.phone_number}
                        </div>

                        <div
                          style={{
                            fontSize: "13px",
                            color: "#6b7280",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "220px",
                          }}
                        >
                          {conversation.last_message ||
                            "No message"}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#9ca3af",
                          marginBottom: "7px",
                        }}
                      >
                        {formatTime(
                          conversation.last_message_at
                        )}
                      </div>

                      {conversation.unread_count > 0 && (
                        <span
                          style={{
                            display: "inline-flex",
                            minWidth: "20px",
                            height: "20px",
                            padding: "0 6px",
                            borderRadius: "999px",
                            background: "#16a34a",
                            color: "#ffffff",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "11px",
                            fontWeight: 700,
                          }}
                        >
                          {conversation.unread_count}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              );
            })
          )}
        </aside>

        {/* Chat */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#efeae2",
          }}
        >
          {!selectedConversation ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6b7280",
              }}
            >
              Select a conversation.
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div
                style={{
                  height: "72px",
                  background: "#ffffff",
                  borderBottom: "1px solid #e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 24px",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "#dcfce7",
                    color: "#166534",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  {(
                    selectedConversation.display_name ||
                    selectedConversation.phone_number
                  )
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "15px",
                    }}
                  >
                    {selectedConversation.display_name ||
                      selectedConversation.phone_number}
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    {selectedConversation.phone_number}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {messages.length === 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#6b7280",
                      marginTop: "40px",
                    }}
                  >
                    No messages in this conversation.
                  </div>
                ) : (
                  messages.map((message) => {
                    const inbound =
                      message.direction === "inbound";

                    return (
                      <div
                        key={message.id}
                        style={{
                          display: "flex",
                          justifyContent: inbound
                            ? "flex-start"
                            : "flex-end",
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "65%",
                            padding: "10px 13px",
                            borderRadius: inbound
                              ? "10px 10px 10px 2px"
                              : "10px 10px 2px 10px",
                            background: inbound
                              ? "#ffffff"
                              : "#d9fdd3",
                            boxShadow:
                              "0 1px 1px rgba(0,0,0,0.08)",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              lineHeight: 1.5,
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                            }}
                          >
                            {message.message_text ||
                              `[${message.message_type}]`}
                          </div>

                          <div
                            style={{
                              marginTop: "5px",
                              fontSize: "10px",
                              color: "#9ca3af",
                              textAlign: "right",
                            }}
                          >
                            {formatTime(message.created_at)}

                            {!inbound &&
                              message.status && (
                                <>
                                  {" · "}
                                  {message.status}
                                </>
                              )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Reply */}
              <ReplyBox
                conversationId={selectedConversation.id}
                phoneNumber={selectedConversation.phone_number}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}
