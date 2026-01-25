# Event Hub - Authentication Setup Guide

## 🎓 Overview

Event Hub is a college-only event hosting and booking platform with mandatory Google OAuth authentication. This guide covers the complete authentication system setup.

## ✨ Features

- **Google OAuth Authentication** - College email verification
- **Profile Completion Flow** - Collect additional user details after OAuth
- **Route Protection** - Middleware-based access control
- **Responsive Design** - Beautiful split-screen layout
- **Form Validation** - Client-side validation with error states
- **Type-Safe** - Full TypeScript support

## 🏗️ Architecture

### Authentication Flow

1. **Initial Access** → User visits any route
2. **Middleware Check** → Redirect unauthenticated users to `/signup`
3. **Google OAuth** → User signs in with college Google account
4. **Domain Validation** → Verify email is from approved college domain
5. **Profile Completion** → Collect first name, last name, phone, roll number
6. **Database Update** → Save user profile with `isProfileComplete: true`
7. **Access Granted** → Redirect to homepage

### File Structure

```
eventhub/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts          # NextAuth configuration
│   │   └── profile/
│   │       └── complete/
│   │           └── route.ts          # Profile completion API
│   ├── signup/
│   │   └── page.tsx                  # Main signup page
│   └── layout.tsx                    # Root layout with AuthProvider
├── components/
│   └── authprovider.tsx             # Session provider wrapper
├── middleware.ts                     # Route protection
├── prisma/
│   └── schema.prisma                # Database schema
└── types/
    └── next-auth.d.ts               # NextAuth type extensions
```

## 🚀 Setup Instructions

### 1. Install Dependencies

All required dependencies are already in `package.json`:
- `next-auth` - Authentication
- `@prisma/client` - Database ORM
- `@tanstack/react-query` - Data fetching (optional)

```bash
cd eventhub
npm install
```

### 2. Database Setup

#### Update Prisma Schema

The schema has been updated with additional user fields:
- `firstName`, `lastName`
- `phoneNumber`, `rollNumber`
- `isProfileComplete` (boolean flag)
- `createdAt`, `updatedAt`

#### Run Migrations

```bash
npx prisma migrate dev --name add_profile_fields
npx prisma generate
```

### 3. Google OAuth Setup

#### Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable Google+ API

#### Create OAuth Credentials

1. Navigate to **APIs & Credentials** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client ID**
3. Configure OAuth consent screen:
   - User Type: **External** (or Internal for organization)
   - App name: **Event Hub**
   - Authorized domains: Add your domain
4. Create OAuth Client ID:
   - Application type: **Web application**
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: 
     - `http://localhost:3000/api/auth/callback/google`
     - `https://yourdomain.com/api/auth/callback/google` (production)

#### Save Credentials

Copy the **Client ID** and **Client Secret**

### 4. Environment Variables

Create `.env` file in the `eventhub` directory:

```bash
cp .env.example .env
```

Fill in the values:

```env
# NextAuth Secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your-random-secret-here

# NextAuth URL
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/eventhub
```

### 5. Configure Allowed Domains

Edit [app/api/auth/[...nextauth]/route.ts](app/api/auth/[...nextauth]/route.ts#L18-L23):

```typescript
const ALLOWED_DOMAINS = [
  "students.youruniversity.edu",   // Student emails
  "youruniversity.edu",             // Faculty emails
  // Add more domains as needed
];
```

### 6. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` - you'll be redirected to the signup page.

## 🎨 UI Components

### Signup Page Features

**Split-Screen Design:**
- **Left Side:** Signup form with Google button
- **Right Side:** Visual showcase with gradient and feature cards

**Profile Completion Form:**
- First Name (required)
- Last Name (required)
- College Email (auto-filled, disabled)
- Phone Number (10 digits, numeric only)
- Roll Number (required)

**Responsive Design:**
- Desktop: Side-by-side layout
- Mobile: Stacked layout

**Error Handling:**
- Invalid domain error messages
- Form validation errors
- API error handling

## 🔒 Security Features

### Domain Validation

Only emails from approved college domains can sign up:

```typescript
function isCollegeEmail(email: string): boolean {
  return ALLOWED_DOMAINS.some(domain => 
    email.toLowerCase().endsWith(`@${domain}`)
  );
}
```

### Route Protection

Middleware protects all routes except:
- `/signup`
- `/api/auth/*`
- Static assets

### Session Management

- JWT-based sessions
- Secure cookie storage
- Auto-refresh on token expiry

## 📝 API Routes

### `GET/POST /api/auth/[...nextauth]`

NextAuth handler for:
- Google OAuth flow
- Session management
- Token generation

### `POST /api/profile/complete`

Complete user profile after OAuth:

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "9876543210",
  "rollNumber": "CS21B1001"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile completed successfully",
  "user": {
    "id": "...",
    "email": "john@university.edu",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

## 🧪 Testing

### Test Flow

1. Visit `http://localhost:3000`
2. Should redirect to `/signup`
3. Click "Sign up with College Google Account"
4. Select a Google account with approved domain
5. Complete profile form
6. Should redirect to homepage
7. Try accessing protected routes (should work)
8. Clear session and try again (should redirect to signup)

### Test Invalid Domain

1. Try signing in with non-college email (e.g., @gmail.com)
2. Should see error message on signup page
3. Should not create user in database

### Test Profile Completion

1. Complete profile with valid data
2. Check database: `isProfileComplete` should be `true`
3. Try accessing homepage: should work
4. Create new user but don't complete profile
5. Should be stuck on profile completion form

## 🎯 Key Assumptions

1. **Backend Exists** - API routes are implemented but assume production backend
2. **Database Connection** - PostgreSQL database is configured
3. **Email Domains** - You configure allowed domains in code
4. **No Email Verification** - Google OAuth handles verification
5. **Session Storage** - JWT tokens stored in secure cookies

## 🔧 Customization

### Change Allowed Domains

Edit `ALLOWED_DOMAINS` array in [route.ts](app/api/auth/[...nextauth]/route.ts)

### Modify Profile Fields

1. Update Prisma schema
2. Run migration
3. Update form in `signup/page.tsx`
4. Update API validation in `api/profile/complete/route.ts`

### Styling

All styles use Tailwind CSS. Customize in `signup/page.tsx`:
- Colors: Gradient from blue-600 → purple-600 → pink-500
- Fonts: Geist Sans (default)
- Dark mode: Fully supported

### Redirect Paths

Change in `middleware.ts` and `route.ts`:
- Default protected route: `/`
- Signup route: `/signup`

## 📱 Mobile Responsiveness

- **Desktop (lg):** Split-screen layout
- **Tablet (md):** Split-screen with smaller images
- **Mobile (sm):** Stacked layout, form on top

## 🐛 Troubleshooting

### "Unauthorized" Error

- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain

### Google Sign-In Fails

- Verify Google Client ID/Secret
- Check authorized redirect URIs
- Ensure Google+ API is enabled

### Database Errors

- Run `npx prisma generate`
- Check `DATABASE_URL` connection string
- Verify migrations are applied

### Middleware Not Working

- Check `middleware.ts` is at root level
- Verify matcher pattern includes your route
- Clear Next.js cache: `rm -rf .next`

## 📚 Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

## 🎓 Production Checklist

- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Configure production `NEXTAUTH_URL`
- [ ] Add production redirect URIs to Google OAuth
- [ ] Set up production database
- [ ] Configure allowed email domains
- [ ] Enable HTTPS
- [ ] Set up error monitoring
- [ ] Test all authentication flows
- [ ] Set up session timeout (default: 30 days)
- [ ] Configure rate limiting on auth endpoints

## 💡 Notes

- **No Backend Implementation**: This is frontend-focused. Assumes backend APIs exist.
- **Mock Data Accepted**: Can work with mock/stub APIs during development.
- **Scalable Architecture**: Built for production with proper separation of concerns.
- **TypeScript**: Full type safety for better DX and fewer bugs.
- **Comments**: Code is heavily commented for maintainability.

---

**Built with ❤️ for college communities**
