const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || '';
const META_PHONE_NUMBER_ID = process.env.META_PHONE_NUMBER_ID || '';

export class MetaWhatsAppService {
  /**
   * Send WhatsApp Message via Meta Cloud API
   * 
   * @param to Phone number with country code (e.g. 91XXXXXXXXXX)
   * @param templateName The name of the template configured in Meta Business Manager
   * @param languageCode The language code (e.g., 'en_US')
   * @param components Array of components for the template (header, body, buttons)
   */
  static async sendTemplateMessage(to: string, templateName: string, languageCode: string, components: any[]) {
    // Meta expects destination without '+'
    const cleanDestination = to.replace('+', '');

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
      const response = await fetch(`https://graph.facebook.com/v19.0/${META_PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${META_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to send Meta WhatsApp message');
      }

      return data;
    } catch (error) {
      console.error('Meta WhatsApp Send Message Error:', error);
      // Don't break the main flow if WhatsApp fails
      return null;
    }
  }

  /**
   * Helper to send Registration Confirmation
   */
  static async sendConfirmation(phone: string, name: string) {
    const meetLink = process.env.GOOGLE_MEET_LINK || 'Link provided soon';
    const firstName = name.split(' ')[0];

    // Assuming template takes parameters for body (e.g., {{1}} Name, {{2}} Date, {{3}} Time, {{4}} Link)
    const components = [
      {
        type: "body",
        parameters: [
          { type: "text", text: firstName },
          { type: "text", text: "Upcoming Sunday" },
          { type: "text", text: "11:00 AM IST" },
          { type: "text", text: meetLink }
        ]
      }
    ];

    return this.sendTemplateMessage(phone, "registration_confirmation", "en", components);
  }
}
