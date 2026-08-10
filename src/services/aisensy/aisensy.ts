const AISENSY_API_KEY = process.env.AISENSY_API_KEY || '';
const CAMPAIGN_NAME = process.env.AISENSY_CAMPAIGN_NAME || '';

export class AiSensyService {
  /**
   * Send WhatsApp Message via AiSensy
   * 
   * @param destination Phone number with country code (e.g. +91XXXXXXXXXX)
   * @param templateParams Array of strings matching the {{1}}, {{2}} placeholders in your template
   */
  static async sendMessage(destination: string, templateParams: string[]) {
    // AiSensy expects destination without '+'
    const cleanDestination = destination.replace('+', '');

    const payload = {
      apiKey: AISENSY_API_KEY,
      campaignName: CAMPAIGN_NAME,
      destination: cleanDestination,
      userName: "Puneet Masterclass",
      templateParams: templateParams,
      // Source determines the origin of the message
      source: "new-registration",
      media: {}
    };

    try {
      const response = await fetch('https://backend.aisensy.com/campaign/t1/api/v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send WhatsApp message');
      }

      return data;
    } catch (error) {
      console.error('AiSensy Send Message Error:', error);
      // We don't want to break the main flow if WhatsApp fails
      return null;
    }
  }

  /**
   * Helper to send Registration Confirmation
   */
  static async sendConfirmation(phone: string, name: string) {
    const meetLink = process.env.GOOGLE_MEET_LINK || 'Link provided soon';
    
    // Assuming template takes: {{1}} Name, {{2}} Date, {{3}} Time, {{4}} Link
    return this.sendMessage(phone, [
      name.split(' ')[0], // First name
      'Sunday, Upcoming', // Date
      '11:00 AM IST',     // Time
      meetLink            // Link
    ]);
  }
}
