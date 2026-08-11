import { NextResponse } from 'next/server';

export class MetaWhatsAppService {
  /**
   * Helper to normalize Indian phone numbers securely to 91XXXXXXXXXX
   */
  private static formatPhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '');
    
    // If it's a 10-digit number, assume it's an Indian number and prepend 91
    if (cleaned.length === 10) {
      cleaned = '91' + cleaned;
    }
    
    // If it starts with 0 and is 11 digits (e.g., 09876543210), remove 0 and prepend 91
    if (cleaned.length === 11 && cleaned.startsWith('0')) {
      cleaned = '91' + cleaned.substring(1);
    }

    return cleaned;
  }

  static async sendTemplateMessage(
    to: string,
    templateName: string,
    languageCode: string,
    components: any[]
  ) {
    const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
    const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const META_GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v19.0';

    if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      return {
        success: false,
        error: 'Missing WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID'
      };
    }

    const cleanDestination = this.formatPhoneNumber(to);

    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: cleanDestination,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: languageCode
        },
        components: components
      }
    };

    try {
      const response = await fetch(`https://graph.facebook.com/${META_GRAPH_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          httpStatus: response.status,
          error: data.error || data
        };
      }

      return {
        success: true,
        httpStatus: response.status,
        messageId: data.messages?.[0]?.id,
        data: data
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Network or parse error: ' + error.message
      };
    }
  }

  /**
   * Helper to send Registration Confirmation
   * Template: payment_confirmation_1
   * Parameters: {{1}} = attendee name, {{2}} = payment amount, {{3}} = workshop name
   */
  static async sendConfirmation(phone: string, name: string, amount: string) {
    const templateName = process.env.WHATSAPP_CONFIRMATION_TEMPLATE;
    const languageCode = process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en_US';
    const workshopName = process.env.WORKSHOP_NAME || 'The Psychology Behind Writing';

    if (!templateName) {
      return { success: false, error: 'WHATSAPP_CONFIRMATION_TEMPLATE is not configured' };
    }

    const firstName = name.trim().split(' ')[0];

    // Template payment_confirmation_1:
    // {{1}} = attendee name
    // {{2}} = payment amount
    // {{3}} = workshop name
    const components = [
      {
        type: "body",
        parameters: [
          { type: "text", text: firstName },
          { type: "text", text: amount },
          { type: "text", text: workshopName }
        ]
      }
    ];

    return this.sendTemplateMessage(phone, templateName, languageCode, components);
  }
}
