/**
 * Email utility for sending transactional emails
 * Uses Resend for reliable email delivery
 * 
 * Required environment variables:
 * - RESEND_API_KEY: Your Resend API key
 * - EMAIL_FROM: Sender email address (must be verified in Resend)
 */

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

interface EventReminderData {
  userEmail: string;
  userName: string;
  eventTitle: string;
  eventDate: Date;
  eventLocation: string;
  clubName: string;
}

/**
 * Send a generic email
 */
export async function sendEmail({ to, subject, text }: EmailOptions): Promise<boolean> {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const EMAIL_FROM = process.env.EMAIL_FROM || 'Event Hub <noreply@eventhub.com>';

    if (!RESEND_API_KEY) {
      console.warn('[EMAIL] RESEND_API_KEY not configured - email not sent');
      return false;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[EMAIL] Send failed:', error);
      return false;
    }

    console.log('[EMAIL] Sent successfully to:', to);
    return true;
  } catch (error) {
    console.error('[EMAIL] Send error:', error);
    return false;
  }
}

/**
 * Send event registration confirmation email
 */
export async function sendRegistrationEmail(data: EventReminderData): Promise<boolean> {
  const { userEmail, userName, eventTitle, eventDate, eventLocation, clubName } = data;

  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const emailText = `
Hi ${userName || 'there'}!

You have successfully registered for the following event:

EVENT: ${eventTitle}
HOSTED BY: ${clubName}
DATE & TIME: ${formattedDate}
VENUE: ${eventLocation}

We're excited to see you there!

If you need to cancel your registration, you can do so from your dashboard.

Best regards,
Event Hub Team
  `.trim();

  return sendEmail({
    to: userEmail,
    subject: `Registration Confirmed: ${eventTitle}`,
    text: emailText,
  });
}

/**
 * Send event reminder email (can be triggered manually)
 */
export async function sendEventReminderEmail(data: EventReminderData): Promise<boolean> {
  const { userEmail, userName, eventTitle, eventDate, eventLocation, clubName } = data;

  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const emailText = `
Hi ${userName || 'there'}!

This is a reminder for your upcoming event:

EVENT: ${eventTitle}
HOSTED BY: ${clubName}
DATE & TIME: ${formattedDate}
VENUE: ${eventLocation}

Don't forget to attend!

Best regards,
Event Hub Team
  `.trim();

  return sendEmail({
    to: userEmail,
    subject: `Reminder: ${eventTitle}`,
    text: emailText,
  });
}
