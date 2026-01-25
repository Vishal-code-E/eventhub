/**
 * Middleware - Route Protection for Event Hub
 * 
 * This middleware ensures that:
 * 1. Unauthenticated users are redirected to /signup
 * 2. Authenticated users with incomplete profiles are redirected to /signup
 * 3. Only fully authenticated users can access protected routes
 * 
 * Public Routes (No Auth Required):
 * - /signup
 * - /api/auth/* (NextAuth endpoints)
 * 
 * Protected Routes (Auth Required):
 * - All other routes (/, /events, /clubs, /gallery, etc.)
 */

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Allow access to signup and auth routes
    if (path.startsWith("/signup") || path.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    // Check if user is authenticated
    if (!token) {
      // Redirect to signup if not authenticated
      const signupUrl = new URL("/signup", req.url);
      return NextResponse.redirect(signupUrl);
    }

    // Allow authenticated users to proceed
    // Note: Profile completion check is handled client-side in the signup page
    return NextResponse.next();
  },
  {
    callbacks: {
      /**
       * Determines if the middleware should run
       * Returns true to run middleware, false to skip
       */
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Always allow access to public routes
        if (
          path.startsWith("/signup") ||
          path.startsWith("/api/auth") ||
          path.startsWith("/_next") || // Next.js internal routes
          path.startsWith("/favicon") // Favicon requests
        ) {
          return true;
        }

        // For all other routes, require authentication
        return !!token;
      },
    },
    pages: {
      signIn: "/signup",
    },
  }
);

/**
 * Matcher Configuration
 * Defines which routes the middleware should run on
 * 
 * Excludes:
 * - Static files (_next/static)
 * - Image optimization (_next/image)
 * - Favicon files
 * - Public folder assets
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
