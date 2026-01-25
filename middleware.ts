/**
 * Middleware - Route Protection for Event Hub
 * 
 * DEVELOPMENT MODE: Authentication is optional to allow building
 * PRODUCTION MODE: Uncomment the withAuth wrapper to enforce authentication
 * 
 * To enable full authentication:
 * 1. Uncomment the withAuth export at the bottom
 * 2. Comment out the simple export default
 * 
 * Protected Routes (when auth is enabled):
 * - /admin/* - Admin dashboard
 * - /student/dashboard - Student dashboard
 * 
 * Public Routes (always accessible):
 * - / - Home page
 * - /events, /clubs, /gallery, /about, /contact
 * - /signup, /login
 * - /api/auth/* (NextAuth endpoints)
 */

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * DEVELOPMENT MODE - Allow all routes
 * This lets you build the site without authentication blocking navigation
 */
export default function middleware(req: NextRequest) {
  // Allow all routes during development
  return NextResponse.next();
}

/**
 * PRODUCTION MODE - Full Authentication
 * Uncomment this section and comment out the above function to enable auth
 */
/*
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Protected routes - require authentication
    const protectedRoutes = [
      '/admin',
      '/student/dashboard',
    ];

    // Check if current path is protected
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

    // Redirect to signup if trying to access protected route without auth
    if (isProtectedRoute && !token) {
      const signupUrl = new URL("/signup", req.url);
      return NextResponse.redirect(signupUrl);
    }

    // Allow all other routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Always allow access to public routes
        if (
          path.startsWith("/signup") ||
          path.startsWith("/login") ||
          path.startsWith("/api/auth") ||
          path.startsWith("/_next") ||
          path.startsWith("/favicon") ||
          path === "/" ||
          path.startsWith("/events") ||
          path.startsWith("/clubs") ||
          path.startsWith("/gallery") ||
          path.startsWith("/about") ||
          path.startsWith("/contact")
        ) {
          return true;
        }

        // For protected routes, require authentication
        return !!token;
      },
    },
    pages: {
      signIn: "/signup",
    },
  }
);
*/

/**
 * Matcher Configuration
 * Defines which routes the middleware should run on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except static files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
