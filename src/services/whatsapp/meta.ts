export class MetaWhatsAppService {
  /**
   * Normalize Indian phone numbers to:
   * 91XXXXXXXXXX
   */
  private static formatPhoneNumber(phone: string): string {
    let cleaned = phone.replace(/\D/g, "");

    // 10 digit Indian number
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
   * Send a WhatsApp Cloud API template message.
   */
  static async sendTemplateMessage(
    to: string,
    templateName: string,
    languageCode: string,
    components: any[] = []
  ) {
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const graphVersion =
      process.env.META_GRAPH_VERSION || "v19.0";

    if (!accessToken || !phoneNumberId) {
      return {
        success: false,
        error:
          "Missing WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID",
      };
    }

    const cleanDestination = this.formatPhoneNumber(to);

    if (!cleanDestination || cleanDestination.length < 12) {
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
        ...(components.length > 0 ? { components } : {}),
      },
    };

    try {
      console.log(
        `[WhatsApp] Sending template "${templateName}" to ${cleanDestination}`
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
          `[WhatsApp] Template "${templateName}" failed:`,
          data
        );

        return {
          success: false,
          httpStatus: response.status,
          error: data.error || data,
        };
      }

      const messageId = data.messages?.[0]?.id;

      console.log(
        `[WhatsApp] Template "${templateName}" sent successfully. Message ID: ${messageId}`
      );

      return {
        success: true,
        httpStatus: response.status,
        messageId,
        data,
      };
    } catch (error: any) {
      console.error(
        `[WhatsApp] Network error for "${templateName}":`,
        error
      );

      return {
        success: false,
        error: "Network or parse error: " + error.message,
      };
    }
  }

  /**
   * Get first name safely.
   */
  private static getFirstName(name: string): string {
    return (
      name?.trim()?.split(/\s+/)[0] ||
      "Attendee"
    );
  }

  /**
   * ---------------------------------------------------------
   * PAYMENT CONFIRMATION
   * Template: payment_confirmation_1
   *
   * {{1}} = first name
   * {{2}} = amount
   * {{3}} = workshop name
   * Language: English (US)
   * ---------------------------------------------------------
   */
  static async sendConfirmation(
    phone: string,
    name: string,
    amount: string
  ) {
    const workshopName =
      process.env.WORKSHOP_NAME ||
      "The Psychology Behind Writing";

    const firstName = this.getFirstName(name);

    const components = [
      {
        type: "body",
        parameters: [
          {
            type: "text",
            text: firstName,
          },
          {
            type: "text",
            text: amount,
          },
          {
            type: "text",
            text: workshopName,
          },
        ],
      },
    ];

    return this.sendTemplateMessage(
      phone,
      "payment_confirmation_1",
      "en_US",
      components
    );
  }

  /**
   * ---------------------------------------------------------
   * 6 DAYS BEFORE
   * Template: psychology_reminder_6_days
   *
   * {{1}} = first name
   * Language: English
   * ---------------------------------------------------------
   */
  static async sendReminder6Days(
    phone: string,
    name: string
  ) {
    const firstName = this.getFirstName(name);

    return this.sendTemplateMessage(
      phone,
      "psychology_reminder_6_days",
      "en",
      [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: firstName,
            },
          ],
        },
      ]
    );
  }

  /**
   * ---------------------------------------------------------
   * 5 DAYS BEFORE
   * Template: psychology_daily_1_sep
   *
   * {{1}} = first name
   * ---------------------------------------------------------
   */
  static async sendReminder5Days(
    phone: string,
    name: string
  ) {
    const firstName = this.getFirstName(name);

    return this.sendTemplateMessage(
      phone,
      "psychology_daily_1_sep",
      "en",
      [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: firstName,
            },
          ],
        },
      ]
    );
  }

  /**
   * ---------------------------------------------------------
   * 4 DAYS BEFORE
   * Template: psychology_daily_2_sep
   *
   * {{1}} = first name
   * ---------------------------------------------------------
   */
  static async sendReminder4Days(
    phone: string,
    name: string
  ) {
    const firstName = this.getFirstName(name);

    return this.sendTemplateMessage(
      phone,
      "psychology_daily_2_sep",
      "en",
      [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: firstName,
            },
          ],
        },
      ]
    );
  }

  /**
   * ---------------------------------------------------------
   * 3 DAYS BEFORE
   * Template: psychology_daily_3_sep
   *
   * {{1}} = first name
   * ---------------------------------------------------------
   */
  static async sendReminder3Days(
    phone: string,
    name: string
  ) {
    const firstName = this.getFirstName(name);

    return this.sendTemplateMessage(
      phone,
      "psychology_daily_3_sep",
      "en",
      [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: firstName,
            },
          ],
        },
      ]
    );
  }

  /**
   * ---------------------------------------------------------
   * 2 DAYS BEFORE
   * Template: psychology_daily_4_sep
   *
   * {{1}} = first name
   * ---------------------------------------------------------
   */
  static async sendReminder2Days(
    phone: string,
    name: string
  ) {
    const firstName = this.getFirstName(name);

    return this.sendTemplateMessage(
      phone,
      "psychology_daily_4_sep",
      "en",
      [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: firstName,
            },
          ],
        },
      ]
    );
  }

  /**
   * ---------------------------------------------------------
   * TOMORROW
   * Template: psychology_webinar_tomorrow
   *
   * {{1}} = first name
   * {{2}} = webinar link
   * ---------------------------------------------------------
   */
  static async sendWebinarTomorrow(
    phone: string,
    name: string,
    webinarUrl: string
  ) {
    const firstName = this.getFirstName(name);

    return this.sendTemplateMessage(
      phone,
      "psychology_webinar_tomorrow",
      "en",
      [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: firstName,
            },
            {
              type: "text",
              text: webinarUrl,
            },
          ],
        },
      ]
    );
  }

  /**
   * ---------------------------------------------------------
   * WEBINAR TODAY
   * Template: psychology_webinar_today
   *
   * {{1}} = first name
   * {{2}} = webinar link
   * ---------------------------------------------------------
   */
  static async sendWebinarToday(
    phone: string,
    name: string,
    webinarUrl: string
  ) {
    const firstName = this.getFirstName(name);

    return this.sendTemplateMessage(
      phone,
      "psychology_webinar_today",
      "en",
      [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: firstName,
            },
            {
              type: "text",
              text: webinarUrl,
            },
          ],
        },
      ]
    );
  }

  /**
   * ---------------------------------------------------------
   * 1 HOUR BEFORE
   * Template: psychology_one_hour
   *
   * {{1}} = first name
   * {{2}} = webinar link
   * ---------------------------------------------------------
   */
  static async sendOneHourReminder(
    phone: string,
    name: string,
    webinarUrl: string
  ) {
    const firstName = this.getFirstName(name);

    return this.sendTemplateMessage(
      phone,
      "psychology_one_hour",
      "en",
      [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: firstName,
            },
            {
              type: "text",
              text: webinarUrl,
            },
          ],
        },
      ]
    );
  }

  /**
   * ---------------------------------------------------------
   * 30 MINUTES BEFORE
   * Template: psychology_thirty_minutes
   *
   * {{1}} = first name
   * {{2}} = webinar link
   * ---------------------------------------------------------
   */
  static async sendThirtyMinuteReminder(
    phone: string,
    name: string,
    webinarUrl: string
  ) {
    const firstName = this.getFirstName(name);

    return this.sendTemplateMessage(
      phone,
      "psychology_thirty_minutes",
      "en",
      [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: firstName,
            },
            {
              type: "text",
              text: webinarUrl,
            },
          ],
        },
      ]
    );
  }

  /**
   * ---------------------------------------------------------
   * LIVE NOW
   * Template: psychology_live_now
   *
   * {{1}} = first name
   * {{2}} = webinar link
   * ---------------------------------------------------------
   */
  static async sendLiveNow(
    phone: string,
    name: string,
    webinarUrl: string
  ) {
    const firstName = this.getFirstName(name);

    return this.sendTemplateMessage(
      phone,
      "psychology_live_now",
      "en",
      [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: firstName,
            },
            {
              type: "text",
              text: webinarUrl,
            },
          ],
        },
      ]
    );
  }

  /**
   * ---------------------------------------------------------
   * FEEDBACK
   * Template: psychology_feedback
   *
   * {{1}} = first name
   * ---------------------------------------------------------
   */
  static async sendFeedback(
    phone: string,
    name: string
  ) {
    const firstName = this.getFirstName(name);

    return this.sendTemplateMessage(
      phone,
      "psychology_feedback",
      "en",
      [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: firstName,
            },
          ],
        },
      ]
    );
  }
}
