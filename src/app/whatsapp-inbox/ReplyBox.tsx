"use client";

import { useState } from "react";

type ReplyBoxProps = {
  conversationId: string;
  phoneNumber: string;
};

export default function ReplyBox({
  conversationId,
  phoneNumber,
}: ReplyBoxProps) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSend() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || sending) return;

    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: trimmedMessage,
          conversationId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to send WhatsApp message."
        );
      }

      setMessage("");

      window.location.reload();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send WhatsApp message."
      );
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e5e7eb",
        padding: "14px 18px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={sending}
          placeholder={
            sending ? "Sending..." : "Type a message..."
          }
          style={{
            flex: 1,
            padding: "13px 15px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: "14px",
            background: sending ? "#f3f4f6" : "#ffffff",
          }}
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!message.trim() || sending}
          style={{
            padding: "0 22px",
            border: "none",
            borderRadius: "10px",
            background:
              !message.trim() || sending
                ? "#d1d5db"
                : "#16a34a",
            color: "#ffffff",
            fontWeight: 600,
            cursor:
              !message.trim() || sending
                ? "not-allowed"
                : "pointer",
          }}
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>

      {error && (
        <div
          style={{
            marginTop: "8px",
            fontSize: "12px",
            color: "#dc2626",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
