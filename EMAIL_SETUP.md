# Email Setup Guide

## Overview
Event Hub uses **Resend** for transactional emails. Emails are sent when users register for events.

## Setup Instructions

### 1. Sign up for Resend
1. Go to https://resend.com
2. Create a free account (allows 100 emails/day, 3,000/month)
3. Verify your email

### 2. Get Your API Key
1. Go to https://resend.com/api-keys
2. Click "Create API Key"
3. Copy the API key (starts with `re_`)

### 3. Add to Environment Variables
Add to `.env` file:
```env
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="Event Hub <noreply@yourdomain.com>"
```

### 4. Verify Domain (Production Only)
For production, verify your domain in Resend:
1. Go to Resend Dashboard → Domains
2. Add your domain
3. Add DNS records (DKIM, SPF, DMARC)

For **development/testing**, you can use Resend's default domain and send to verified emails.

## Email Types

### 1. Registration Confirmation Email
**Trigger:** When user registers for an event

**Content:**
- Event title
- Date & time
- Venue
- Confirmation message

**Sent automatically** via `/api/events/[id]/register` (POST)

### 2. Event Reminder Email
**Trigger:** Manual (can be scheduled later)

**Usage:**
```typescript
import { sendEventReminderEmail } from '@/lib/email';

await sendEventReminderEmail({
  userEmail: 'user@example.com',
  userName: 'John',
  eventTitle: 'Tech Fest 2026',
  eventDate: new Date('2026-02-15'),
  eventLocation: 'Main Auditorium',
  clubName: 'Tech Club'
});
```

## Testing

### Local Testing
1. Set `RESEND_API_KEY` in `.env`
2. Register for an event
3. Check terminal logs for email status
4. Check your inbox (if using verified email)

### Without API Key
If `RESEND_API_KEY` is not set:
- App continues to work normally
- Emails are logged to console
- Registration still succeeds

## Error Handling
- Email failures DO NOT block registration
- Errors are logged to console
- Users still get registered successfully

## Rate Limits (Free Tier)
- 100 emails/day
- 3,000 emails/month
- 1 verified domain

## Upgrade Path
For production with higher volume:
- Pro Plan: $20/month (50k emails)
- Business Plan: $80/month (100k emails)

## Alternative: Nodemailer
If you prefer Nodemailer, replace `lib/email.ts` with SMTP configuration:
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
```

## Support
- Resend Docs: https://resend.com/docs
- Email lib: `lib/email.ts`
- Registration API: `app/api/events/[id]/register/route.ts`
