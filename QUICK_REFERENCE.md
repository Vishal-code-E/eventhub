# Event Hub - Quick Reference Guide

## 🚀 Common Commands

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Database
```bash
# Generate Prisma Client
npx prisma generate

# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Seed database
npx prisma db seed
```

## 🔑 Authentication Flow

### User Signs Up
1. Visit any route → redirected to `/signup`
2. Click "Sign up with College Google Account"
3. Google OAuth authentication
4. Email domain validated
5. Profile completion form shown
6. User submits additional details
7. Redirected to homepage

### User Already Registered
1. Visit any route → redirected to `/signup`
2. Click "Sign up with College Google Account"
3. Google recognizes user
4. Automatically redirected to homepage (profile already complete)

### User Logs Out
1. Click "Logout" in navbar
2. Session destroyed
3. Redirected to `/signup`
4. Cannot access protected routes

## 📁 File Locations

### Key Files
- **NextAuth Config:** `app/api/auth/[...nextauth]/route.ts`
- **Signup Page:** `app/signup/page.tsx`
- **Middleware:** `middleware.ts`
- **Profile API:** `app/api/profile/complete/route.ts`
- **Auth Provider:** `components/authprovider.tsx`
- **Type Definitions:** `types/next-auth.d.ts`
- **Database Schema:** `prisma/schema.prisma`

### Configuration
- **Environment:** `.env`
- **Allowed Domains:** `app/api/auth/[...nextauth]/route.ts` (line 18)
- **Redirect URLs:** `middleware.ts` and `route.ts`

## 🎨 Customization

### Change Brand Colors
Edit `app/signup/page.tsx`:
```tsx
// Current gradient
from-blue-600 via-purple-600 to-pink-500

// Change to your colors
from-your-color-1 via-your-color-2 to-your-color-3
```

### Add Profile Fields
1. Update Prisma schema:
```prisma
model User {
  // ... existing fields
  department String?
  semester   Int?
}
```

2. Run migration:
```bash
npx prisma migrate dev --name add_profile_fields
```

3. Update form in `app/signup/page.tsx`

4. Update API in `app/api/profile/complete/route.ts`

### Change Allowed Domains
Edit `app/api/auth/[...nextauth]/route.ts`:
```typescript
const ALLOWED_DOMAINS = [
  "youruniversity.edu",
  "students.youruniversity.edu",
];
```

### Modify Session Duration
Edit `app/api/auth/[...nextauth]/route.ts`:
```typescript
session: {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60, // 30 days (default)
  // Change to: 7 * 24 * 60 * 60 for 7 days
},
```

## 🔧 Troubleshooting

### Issue: "Unauthorized" Error
**Solution:**
- Check `.env` has `NEXTAUTH_SECRET`
- Generate new secret: `openssl rand -base64 32`
- Restart dev server

### Issue: Google Sign-In Fails
**Solution:**
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Check redirect URIs in Google Console
- Ensure Google+ API is enabled

### Issue: Domain Validation Fails
**Solution:**
- Check email domain in `ALLOWED_DOMAINS` array
- Verify domain format (e.g., "university.edu")
- Check for typos in domain name

### Issue: Middleware Not Working
**Solution:**
- Ensure `middleware.ts` is at root of `eventhub/` directory
- Check matcher pattern includes your route
- Clear Next.js cache: `rm -rf .next && npm run dev`

### Issue: Database Connection Error
**Solution:**
- Verify `DATABASE_URL` in `.env`
- Check PostgreSQL is running
- Test connection: `npx prisma db push`

### Issue: Type Errors
**Solution:**
- Run `npx prisma generate`
- Restart TypeScript server in VS Code
- Check `types/next-auth.d.ts` exists

### Issue: Build Fails
**Solution:**
- Run `npm run build` to see detailed errors
- Check all dependencies are installed
- Verify all imports are correct

## 🔐 Security Best Practices

### Environment Variables
```bash
# ✅ Good
NEXTAUTH_SECRET=X8kL9mN2pQ5rS7tU1vW3xY6zA4bC8dE0fG2hI5jK

# ❌ Bad
NEXTAUTH_SECRET=mysecret123
```

### Password/Secrets
- Never commit `.env` to Git
- Use different secrets for dev/production
- Rotate secrets periodically
- Use strong random strings

### Domain Validation
```typescript
// ✅ Good - specific domains
const ALLOWED_DOMAINS = [
  "students.university.edu",
  "faculty.university.edu"
];

// ❌ Bad - too permissive
const ALLOWED_DOMAINS = [
  "gmail.com",  // Anyone can register!
  "edu"         // Matches all .edu domains
];
```

## 📊 Database Queries

### Check User Exists
```sql
SELECT * FROM "User" WHERE email = 'student@university.edu';
```

### List All Users
```sql
SELECT email, "firstName", "lastName", "isProfileComplete" FROM "User";
```

### Count Users by Role
```sql
SELECT role, COUNT(*) FROM "User" GROUP BY role;
```

### Find Incomplete Profiles
```sql
SELECT email FROM "User" WHERE "isProfileComplete" = false;
```

## 🧪 Testing Tips

### Test Invalid Domain
```
1. Clear cookies
2. Try signing in with @gmail.com
3. Should see error: "not from an approved college domain"
```

### Test Profile Validation
```
1. Sign in with valid domain
2. Leave fields empty → should show errors
3. Enter 9-digit phone → should show error
4. Enter 11-digit phone → should truncate to 10
```

### Test Session Persistence
```
1. Sign in successfully
2. Refresh page → should stay logged in
3. Close browser and reopen → should stay logged in
4. Clear cookies → should redirect to signup
```

### Test Route Protection
```
1. Log out
2. Try accessing /events directly
3. Should redirect to /signup
4. Log in → should access /events
```

## 📱 Responsive Breakpoints

```css
/* Mobile (default) */
/* < 768px - Stacked layout */

/* Tablet */
@media (min-width: 768px) {
  /* md: - Transitioning to split */
}

/* Desktop */
@media (min-width: 1024px) {
  /* lg: - Full split-screen */
}
```

## 🌐 Environment URLs

### Development
```
NEXTAUTH_URL=http://localhost:3000
```

### Staging
```
NEXTAUTH_URL=https://staging.eventhub.com
```

### Production
```
NEXTAUTH_URL=https://eventhub.com
```

## 📈 Performance Tips

1. **Optimize Images:** Use Next.js `<Image>` component
2. **Lazy Load:** Use `Suspense` for heavy components
3. **Database Indexing:** Add indexes to frequently queried fields
4. **Caching:** Enable Next.js caching in production
5. **CDN:** Serve static assets from CDN

## 🔄 Update Workflow

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest
```

### Update Schema
```bash
# 1. Edit prisma/schema.prisma
# 2. Create migration
npx prisma migrate dev --name description

# 3. Generate client
npx prisma generate
```

## 📞 Support Resources

- **Next.js Docs:** https://nextjs.org/docs
- **NextAuth Docs:** https://next-auth.js.org
- **Prisma Docs:** https://prisma.io/docs
- **Tailwind Docs:** https://tailwindcss.com/docs

## 💡 Pro Tips

1. **Use Prisma Studio** for easy database viewing: `npx prisma studio`
2. **Check session** in browser DevTools → Application → Cookies
3. **Debug middleware** by adding console.logs in `middleware.ts`
4. **Test OAuth locally** with ngrok: `ngrok http 3000`
5. **Monitor API calls** in Network tab during development

---

**Quick Links:**
- [Full Setup Guide](AUTHENTICATION_GUIDE.md)
- [Setup Checklist](SETUP_CHECKLIST.md)
- [Prisma Schema](prisma/schema.prisma)
- [Signup Page](app/signup/page.tsx)
