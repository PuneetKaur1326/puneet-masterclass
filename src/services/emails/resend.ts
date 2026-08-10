import { Resend } from 'resend';
import { ConfirmationEmail } from './templates/ConfirmationEmail';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Only initialize if key exists, otherwise provide a dummy for local dev
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export class EmailService {
  static async sendConfirmation(email: string, name: string) {
    if (!resend) {
      console.warn('RESEND_API_KEY not set. Skipping email to:', email);
      return;
    }

    const meetLink = process.env.GOOGLE_MEET_LINK || 'https://meet.google.com';

    try {
      const data = await resend.emails.send({
        from: 'Puneet <puneet.contentatia@gmail.com>',
        to: [email],
        subject: "You're In! Masterclass Registration Confirmed 🎉",
        react: ConfirmationEmail({ name, meetLink }),
      });

      return data;
    } catch (error) {
      console.error('Resend Error:', error);
      // Don't throw, just log so it doesn't break the webhook flow
      return null;
    }
  }
}
