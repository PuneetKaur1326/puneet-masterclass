export class MetaWhatsAppService {
  /**
   * Normalize Indian phone numbers to:
   * 91XXXXXXXXXX
   */
  private static formatPhoneNumber(phone: string): string {
    let cleaned = phone.replace(/\D/g, "");

    if (cleaned.length === 10) {
      cleaned = "91" + cleaned;
    }

    if (cleaned.length === 11 && cleaned.startsWith("0")) {
      cleaned = "91" + cleaned.substring(1);
    }

    return cleaned;
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
   * Workshop amount.
   */
  private static getAmount(): string {
    return process.env.WORKSHOP_AMOUNT || "₹99";
  }

  /**
   * Webinar joining link.
   */
  private static getLink(): string {
    return process.env.WORKSHOP_JOIN_URL || "";
  }

  /**
   * Send a WhatsApp Cloud API template message.
   *
   * `parameters` must match the variables in the
   * corresponding Meta template in the exact order.
   */
  static async sendTemplateMessage(
    to: string,
    templateName: string,
    languageCode: string,
    parameters: string[]
  ) {
    const accessToken =
      process.env.WHATSAPP_ACCESS_TOKEN;

    const phoneNumberId =
      process.env.WHATSAPP_PHONE_NUMBER_ID;

    const graphVersion =
      process.env.META_GRAPH_VERSION || "v19.0";

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

    const bodyParameters = parameters.map(
      (value) => ({
        type: "text",
        text: String(value ?? ""),
      })
    );

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
            parameters: bodyParameters,
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
        data.messages?.[0]?.id;

      console.log(
        `[WhatsApp] "${templateName}" sent successfully. Message ID: ${messageId}`
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
        error:
          "Network or parse error: " +
          error.message,
      };
    }
  }

  // ==================================================
  // PAYMENT CONFIRMATION
  // ==================================================

  /**
   * Template:
   * payment_confirmation_1
   *
   * Language:
   * en_US
   *
   * Variables:
   * {{1}} = Name
   * {{2}} = Amount
   */
  static async sendConfirmation(
    phone: string,
    name: string,
    amount: string
  ) {
    const templateName =
      process.env.WHATSAPP_CONFIRMATION_TEMPLATE ||
      "payment_confirmation_1";

    return this.sendTemplateMessage(
      phone,
      templateName,
      "en_US",
      [
        this.getFirstName(name),
        amount,
      ]
    );
  }

  // ==================================================
  // 6 DAYS BEFORE
  // ==================================================

  /**
   * Template:
   * psychology_reminder_6_days
   *
   * Language:
   * en
   *
   * Variables:
   * {{1}} = Name
   * {{2}} = Amount
   * {{3}} = Link
   */
  static async sendReminder6Days(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_reminder_6_days",
      "en",
      [
        this.getFirstName(name),
        this.getAmount(),
        this.getLink(),
      ]
    );
  }

  // ==================================================
  // 5 DAYS BEFORE
  // ==================================================

  /**
   * Template:
   * psychology_daily_1_sep
   */
  static async sendReminder5Days(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_daily_1_sep",
      "en",
      [
        this.getFirstName(name),
        this.getAmount(),
        this.getLink(),
      ]
    );
  }

  // ==================================================
  // 4 DAYS BEFORE
  // ==================================================

  /**
   * Template:
   * psychology_daily_2_sep
   */
  static async sendReminder4Days(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_daily_2_sep",
      "en",
      [
        this.getFirstName(name),
        this.getAmount(),
        this.getLink(),
      ]
    );
  }

  // ==================================================
  // 3 DAYS BEFORE
  // ==================================================

  /**
   * Template:
   * psychology_daily_3_sep
   */
  static async sendReminder3Days(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_daily_3_sep",
      "en",
      [
        this.getFirstName(name),
        this.getAmount(),
        this.getLink(),
      ]
    );
  }

  // ==================================================
  // 2 DAYS BEFORE
  // ==================================================

  /**
   * Template:
   * psychology_daily_4_sep
   */
  static async sendReminder2Days(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_daily_4_sep",
      "en",
      [
        this.getFirstName(name),
        this.getAmount(),
        this.getLink(),
      ]
    );
  }

  // ==================================================
  // TOMORROW
  // ==================================================

  /**
   * Template:
   * psychology_webinar_tomorrow
   */
  static async sendWebinarTomorrow(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_webinar_tomorrow",
      "en",
      [
        this.getFirstName(name),
        this.getAmount(),
        this.getLink(),
      ]
    );
  }

  // ==================================================
  // WEBINAR TODAY
  // ==================================================

  /**
   * Template:
   * psychology_webinar_today
   */
  static async sendWebinarToday(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_webinar_today",
      "en",
      [
        this.getFirstName(name),
        this.getAmount(),
        this.getLink(),
      ]
    );
  }

  // ==================================================
  // 1 HOUR BEFORE
  // ==================================================

  /**
   * Template:
   * psychology_one_hour
   */
  static async sendOneHourReminder(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_one_hour",
      "en",
      [
        this.getFirstName(name),
        this.getAmount(),
        this.getLink(),
      ]
    );
  }

  // ==================================================
  // 30 MINUTES BEFORE
  // ==================================================

  /**
   * Template:
   * psychology_thirty_minutes
   */
  static async sendThirtyMinuteReminder(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_thirty_minutes",
      "en",
      [
        this.getFirstName(name),
        this.getAmount(),
        this.getLink(),
      ]
    );
  }

  // ==================================================
  // LIVE NOW
  // ==================================================

  /**
   * Template:
   * psychology_live_now
   *
   * Language:
   * en_GB
   */
  static async sendLiveNow(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_live_now",
      "en_GB",
      [
        this.getFirstName(name),
        this.getAmount(),
        this.getLink(),
      ]
    );
  }

  // ==================================================
  // FEEDBACK
  // ==================================================

  /**
   * Template:
   * psychology_feedback
   */
  static async sendFeedback(
    phone: string,
    name: string
  ) {
    return this.sendTemplateMessage(
      phone,
      "psychology_feedback",
      "en",
      [
        this.getFirstName(name),
        this.getAmount(),
        this.getLink(),
      ]
    );
  }
}
