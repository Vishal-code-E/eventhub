# Event Hub - Setup Checklist

## Pre-Setup Requirements

- [ ] Node.js 18+ installed
- [ ] PostgreSQL database running
- [ ] Google Cloud account
- [ ] Git repository initialized

## Database Setup

- [ ] PostgreSQL database created
- [ ] Database URL added to `.env`
- [ ] Prisma schema reviewed
- [ ] Migrations run: `npx prisma migrate dev`
- [ ] Prisma client generated: `npx prisma generate`

## Google OAuth Setup

### Google Cloud Console

- [ ] Project created/selected in Google Cloud Console
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
  - [ ] App name set to "Event Hub"
  - [ ] Support email added
  - [ ] Authorized domains configured

### OAuth Credentials

- [ ] OAuth 2.0 Client ID created
- [ ] Application type: Web application
- [ ] Authorized JavaScript origins added:
  - [ ] `http://localhost:3000`
  - [ ] Production URL (if deploying)
- [ ] Authorized redirect URIs added:
  - [ ] `http://localhost:3000/api/auth/callback/google`
  - [ ] `https://yourdomain.com/api/auth/callback/google` (production)
- [ ] Client ID copied to `.env`
- [ ] Client Secret copied to `.env`

## Environment Variables

- [ ] `.env` file created (copy from `.env.example`)
- [ ] `NEXTAUTH_SECRET` set (generate: `openssl rand -base64 32`)
- [ ] `NEXTAUTH_URL` set to `http://localhost:3000`
- [ ] `GOOGLE_CLIENT_ID` set
- [ ] `GOOGLE_CLIENT_SECRET` set
- [ ] `DATABASE_URL` set

## Code Configuration

- [ ] Allowed email domains configured in `app/api/auth/[...nextauth]/route.ts`
  ```typescript
  const ALLOWED_DOMAINS = [
    "students.youruniversity.edu",
    "youruniversity.edu",
  ];
  ```
- [ ] Redirect paths verified in `middleware.ts`
- [ ] Session strategy confirmed (JWT)

## Dependencies

- [ ] All packages installed: `npm install`
- [ ] TypeScript compiled successfully
- [ ] No dependency conflicts

## Testing (Local)

- [ ] Development server starts: `npm run dev`
- [ ] Navigate to `http://localhost:3000`
- [ ] Redirects to `/signup` when not authenticated
- [ ] "Sign up with College Google Account" button visible
- [ ] Google OAuth flow works:
  - [ ] Redirects to Google sign-in
  - [ ] Shows account selection
  - [ ] Returns to application
- [ ] Domain validation works:
  - [ ] Approved domain emails → proceed to profile form
  - [ ] Non-approved domain emails → error message shown
- [ ] Profile completion form:
  - [ ] All fields render correctly
  - [ ] College email is pre-filled and disabled
  - [ ] Phone number accepts only digits (max 10)
  - [ ] Form validation shows errors
  - [ ] Submit button disabled while loading
- [ ] Profile submission:
  - [ ] API call succeeds
  - [ ] User redirected to homepage
  - [ ] Navbar shows "Logout" option
- [ ] Session persistence:
  - [ ] Refresh page → still authenticated
  - [ ] Close tab and reopen → still authenticated
- [ ] Route protection:
  - [ ] Logout → redirects to signup
  - [ ] Try accessing `/events` → redirects to signup
  - [ ] Login again → can access all routes
- [ ] Database verification:
  - [ ] User created in database
  - [ ] Profile fields saved correctly
  - [ ] `isProfileComplete` is `true`

## Responsive Design Testing

- [ ] Desktop (1920x1080):
  - [ ] Split-screen layout displays correctly
  - [ ] Form is left-aligned
  - [ ] Visual content is right-aligned
- [ ] Tablet (768px):
  - [ ] Split-screen maintained
  - [ ] Content scaled appropriately
- [ ] Mobile (375px):
  - [ ] Layout stacks vertically
  - [ ] Form is readable and usable
  - [ ] Buttons are tap-friendly
  - [ ] No horizontal scroll

## Security Checks

- [ ] `NEXTAUTH_SECRET` is strong and random
- [ ] Environment variables not committed to Git
- [ ] `.env` in `.gitignore`
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS prevention (React handles this)
- [ ] CSRF protection (NextAuth handles this)
- [ ] Rate limiting configured (optional, recommended for production)

## Performance Checks

- [ ] Page load time < 3 seconds
- [ ] OAuth redirect smooth
- [ ] Form submission quick
- [ ] No console errors
- [ ] No console warnings (except Next.js fast refresh)

## Code Quality

- [ ] TypeScript compilation successful: `npm run build`
- [ ] No ESLint errors: `npm run lint`
- [ ] Code comments present and helpful
- [ ] File structure organized
- [ ] Naming conventions consistent

## Documentation

- [ ] `AUTHENTICATION_GUIDE.md` reviewed
- [ ] Setup instructions clear
- [ ] API endpoints documented
- [ ] Environment variables documented
- [ ] Comments in code explain complex logic

## Production Readiness (Before Deployment)

### Environment

- [ ] Production `.env` created
- [ ] `NEXTAUTH_URL` updated to production URL
- [ ] `NEXTAUTH_SECRET` regenerated (different from dev)
- [ ] Production database URL configured
- [ ] Google OAuth redirect URIs updated for production

### Security

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Session timeout configured (default 30 days)
- [ ] Error messages don't leak sensitive info

### Google OAuth

- [ ] Production redirect URI added to Google Console
- [ ] OAuth consent screen published (if needed)
- [ ] Scopes minimized to necessary only

### Database

- [ ] Production database backups enabled
- [ ] Database migrations run on production
- [ ] Connection pooling configured
- [ ] Indexes added for performance

### Monitoring

- [ ] Error tracking set up (Sentry, LogRocket, etc.)
- [ ] Analytics configured (optional)
- [ ] Uptime monitoring enabled
- [ ] Log aggregation configured

### Performance

- [ ] Built for production: `npm run build`
- [ ] Build size optimized
- [ ] Images optimized
- [ ] Caching configured
- [ ] CDN set up (if applicable)

### Testing

- [ ] All local tests passed on production build
- [ ] Staging environment tested
- [ ] Load testing completed (if high traffic expected)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

### Deployment

- [ ] Deployment platform chosen (Vercel, AWS, etc.)
- [ ] Environment variables set in deployment platform
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] DNS records configured

### Post-Deployment

- [ ] Test authentication flow in production
- [ ] Verify redirect URIs work
- [ ] Check database connections
- [ ] Monitor error logs
- [ ] Test from different devices/networks

## Troubleshooting Completed

If you encountered issues, check these were resolved:

- [ ] "Unauthorized" errors → `NEXTAUTH_SECRET` correct
- [ ] Google sign-in fails → Client ID/Secret correct
- [ ] Domain validation fails → Domain in `ALLOWED_DOMAINS`
- [ ] Database errors → Connection string correct
- [ ] Middleware not working → `middleware.ts` at root
- [ ] Type errors → `npx prisma generate` run
- [ ] Build errors → All dependencies installed

## Additional Features (Optional)

- [ ] Two-factor authentication
- [ ] Email verification for additional security
- [ ] Password-based fallback (if needed)
- [ ] Social login alternatives (Microsoft, GitHub)
- [ ] Admin panel for user management
- [ ] User profile editing
- [ ] Account deletion flow

## Sign-Off

- [ ] All critical features tested
- [ ] Documentation complete
- [ ] Code reviewed
- [ ] Ready for production deployment

---

**Date Completed:** _________________

**Completed By:** _________________

**Notes:**

