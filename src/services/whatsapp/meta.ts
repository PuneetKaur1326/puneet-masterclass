export class MetaWhatsAppService {
  /**
   * Normalize Indian phone numbers to:
   * 91XXXXXXXXXX
   */
  private static formatPhoneNumber(phone: string): string {
    let cleaned = phone.replace(/\D/g, "");

    // 10-digit Indian number
    if (cleaned.length === 10) {
      cleaned = "91" + cleaned;
    }

    // 0XXXXXXXXXX -> 91XXXXXXXXXX
    if (cleaned.length === 11 && cleaned.startsWith("0")) {
      cleaned = "91" + cleaned.substring(1);
    }

    return cleaned;
  }

  /**
   * Get first name safely.
   */
  private static getFirstName(name: string): string {
    return name?.trim()?.split(/\s+/)[0] || "Attendee";
  }

  /**
   * Common workshop amount.
   */
  private static getAmount(): string {
    return process.env.WORKSHOP_AMOUNT || "₹99";
  }

  /**
   * Common workshop link.
   */
  private static getLink(): string {
    return (
      process.env.WORKSHOP_JOIN_URL ||
      "https://meet.google.com/default"
    );
  }

  /**
   * Save an automated outbound message to Supabase
   * so it appears inside the WhatsApp Inbox.
   */
  private static async saveAutomatedMessage(
    phone: string,
    messageId: string | null,
    templateName: string
  ) {
    const supabaseUrl = process.env.SUPABASE_URL;

    const supabaseKey =
      process.env.SUPABASE_SECRET_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error(
        "[WhatsApp] Cannot save automated message: Supabase credentials missing."
      );

      return {
        success: false,
        error: "Supabase credentials missing",
      };
    }

    try {
      /*
       * Find the WhatsApp conversation using the customer's
       * normalized phone number.
       */
      const conversationResponse = await fetch(
        `${supabaseUrl}/rest/v1/whatsapp_conversations?phone_number=eq.${encodeURIComponent(
          phone
        )}&select=id,display_name,phone_number`,
        {
          method: "GET",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      if (!conversationResponse.ok) {
        const errorText = await conversationResponse.text();

        throw new Error(
          `Conversation lookup failed: ${conversationResponse.status} ${errorText}`
        );
      }

      const conversations = await conversationResponse.json();

      let conversationId: string;

      /*
       * If conversation already exists, use it.
       */
      if (Array.isArray(conversations) && conversations.length > 0) {
        conversationId = conversations[0].id;
      } else {
        /*
         * If the customer has never messaged us before,
         * create the conversation so the automated message
         * still appears in the inbox.
         */
        const createConversationResponse = await fetch(
          `${supabaseUrl}/rest/v1/whatsapp_conversations`,
          {
            method: "POST",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              "Content-Type": "application/json",
              Prefer: "return=representation",
            },
            body: JSON.stringify({
              phone_number: phone,
              display_name: phone,
              last_message: `[Automated] ${templateName}`,
              last_message_at: new Date().toISOString(),
              unread_count: 0,
            }),
          }
        );

        if (!createConversationResponse.ok) {
          const errorText =
            await createConversationResponse.text();

          throw new Error(
            `Conversation creation failed: ${createConversationResponse.status} ${errorText}`
          );
        }

        const createdConversation =
          await createConversationResponse.json();

        if (
          !Array.isArray(createdConversation) ||
          !createdConversation[0]?.id
        ) {
          throw new Error(
            "Conversation was not created successfully."
          );
        }

        conversationId = createdConversation[0].id;
      }

      const now = new Date().toISOString();

      /*
       * Save automated outbound message.
       *
       * We store the template name because Meta's API does not
       * return the final rendered template text.
       */
      const messageText = `[Automated] ${templateName}`;

      const messageResponse = await fetch(
        `${supabaseUrl}/rest/v1/whatsapp_messages`,
        {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            conversation_id: conversationId,
            direction: "outbound",
            message_type: "template",
            message_text: messageText,
            whatsapp_message_id: messageId,
            status: "sent",
            status_updated_at: now,
            created_at: now,
          }),
        }
      );

      if (!messageResponse.ok) {
        const errorText = await messageResponse.text();

        throw new Error(
          `Message save failed: ${messageResponse.status} ${errorText}`
        );
      }

      /*
       * Update conversation preview.
       */
      const conversationUpdateResponse = await fetch(
        `${supabaseUrl}/rest/v1/whatsapp_conversations?id=eq.${encodeURIComponent(
          conversationId
        )}`,
        {
          method: "PATCH",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            last_message: messageText,
            last_message_at: now,
            updated_at: now,
          }),
        }
      );

      if (!conversationUpdateResponse.ok) {
        const errorText =
          await conversationUpdateResponse.text();

        console.error(
          "[WhatsApp] Conversation preview update failed:",
          errorText
        );
      }

      console.log(
        `[WhatsApp] Automated message saved to inbox: ${templateName}`
      );

      return {
        success: true,
        conversationId,
      };
    } catch (error: any) {
      console.error(
        "[WhatsApp] Failed to save automated message:",
        error
      );

      return {
        success: false,
        error: error?.message || "Failed to save automated message",
      };
    }
  }

  /**
   * Send a WhatsApp Cloud API template message.
   *
   * All current templates use:
   * {{1}} = Name
   * {{2}} = Amount
   * {{3}} = Link
   */
  static async sendTemplateMessage(
    to: string,
    templateName: string,
    languageCode: string,
    name: string,
    amount: string,
    link: string
  ) {
    const accessToken =
      process.env.WHATSAPP_ACCESS_TOKEN;

    const phoneNumberId =
      process.env.WHATSAPP_PHONE_NUMBER_ID;

    const graphVersion =
      process.env.META_GRAPH_VERSION || "v25.0";

    if (!accessToken || !phoneNumberId) {
      return {
        success: false,
        error:
          "Missing WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID",
      };
    }

    const cleanDestination =
      this.formatPhoneNumber(to);

    if (
      !cleanDestination ||
      cleanDestination.length < 12
    ) {
      return {
        success: false,
        error: `Invalid WhatsApp phone number: ${to}`,
      };
    }

    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: cleanDestination,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: languageCode,
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: name,
              },
              {
                type: "text",
                text: amount,
              },
              {
                type: "text",
                text: link,
              },
            ],
          },
        ],
      },
    };

    try {
      console.log(
        `[WhatsApp] Sending "${templateName}" to ${cleanDestination}`
      );

      const response = await fetch(
        `https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          `[WhatsApp] "${templateName}" failed:`,
          data
        );

        return {
          success: false,
          httpStatus: response.status,
          error: data.error || data,
        };
      }

      const messageId =
        data.messages?.[0]?.id || null;

      console.log(
        `[WhatsApp] "${templateName}" sent successfully. Message ID: ${messageId}`
      );

      /*
       * IMPORTANT:
       * Save the automated message to the WhatsApp Inbox
       * only AFTER Meta confirms that it was sent.
       */
      const inboxResult =
        await this.saveAutomatedMessage(
          cleanDestination,
          messageId,
          templateName
        );

      if (!inboxResult.success) {
        console.error(
          `[WhatsApp] Message was sent but could not be saved to inbox:`,
          inboxResult.error
        );
      }

      return {
        success: true,
        httpStatus: response.status,
        messageId,
        data,
        inboxSaved: inboxResult.success,
      };
    } catch (error: any) {
      console.error(
        `[WhatsApp] Network error for "${templateName}":`,
        error
      );

      return {
        success: false,
        error:
          "Network or parse error: " +
          error.message,
      };
    }
  }

  /**
   * PAYMENT CONFIRMATION
   *
   * Template: payment_confirmation_1
   *
   * {{1}} = Name
   * {{2}} = Amount
   * {{3}} = Link
   */
  static async sendConfirmation(
    phone: string,
    name: string,
    amount: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "payment_confirmation_1",
      "en_US",
      this.getFirstName(name),
      amount,
      this.getLink()
    );
  }

  /**
   * 6 DAYS BEFORE
   */
  static async sendReminder6Days(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_reminder_6_days",
      "en",
      this.getFirstName(name),
      this.getAmount(),
      this.getLink()
    );
  }

  /**
   * 5 DAYS BEFORE
   */
  static async sendReminder5Days(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_daily_1_sep",
      "en",
      this.getFirstName(name),
      this.getAmount(),
      this.getLink()
    );
  }

  /**
   * 4 DAYS BEFORE
   */
  static async sendReminder4Days(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_daily_2_sep",
      "en",
      this.getFirstName(name),
      this.getAmount(),
      this.getLink()
    );
  }

  /**
   * 3 DAYS BEFORE
   */
  static async sendReminder3Days(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_daily_3_sep",
      "en",
      this.getFirstName(name),
      this.getAmount(),
      this.getLink()
    );
  }

  /**
   * 2 DAYS BEFORE
   */
  static async sendReminder2Days(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_daily_4_sep",
      "en",
      this.getFirstName(name),
      this.getAmount(),
      this.getLink()
    );
  }

  /**
   * TOMORROW
   */
  static async sendWebinarTomorrow(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_webinar_tomorrow",
      "en",
      this.getFirstName(name),
      this.getAmount(),
      this.getLink()
    );
  }

  /**
   * WEBINAR TODAY
   */
  static async sendWebinarToday(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_webinar_today",
      "en",
      this.getFirstName(name),
      this.getAmount(),
      this.getLink()
    );
  }

  /**
   * 1 HOUR BEFORE
   */
  static async sendOneHourReminder(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_one_hour",
      "en",
      this.getFirstName(name),
      this.getAmount(),
      this.getLink()
    );
  }

  /**
   * 30 MINUTES BEFORE
   */
  static async sendThirtyMinuteReminder(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_thirty_minutes",
      "en",
      this.getFirstName(name),
      this.getAmount(),
      this.getLink()
    );
  }

  /**
   * LIVE NOW
   *
   * Template language: English (UK)
   */
  static async sendLiveNow(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_live_now",
      "en_GB",
      this.getFirstName(name),
      this.getAmount(),
      this.getLink()
    );
  }

  /**
   * FEEDBACK
   */
  static async sendFeedback(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_feedback",
      "en",
      this.getFirstName(name),
      this.getAmount(),
      this.getLink()
    );
  }
}
