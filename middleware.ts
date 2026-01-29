/**
 * Production-Ready Middleware - Route Protection & Access Control
 * 
 * Implements role-based access control (RBAC) for Event Hub platform
 * 
 * Flow:
 * 1. Check if route is public → allow
 * 2. Check authentication → redirect to /signup if not logged in
 * 3. Check profile completion → redirect to /signup/complete if incomplete
 * 4. Check role authorization → redirect to /403 if unauthorized
 * 5. Allow access if all checks pass
 * 
 * Route Access:
 * - /student/*    → STUDENT only
 * - /club-lead/*  → COORDINATOR only  
 * - /admin/*      → ADMIN only
 * - Public routes → Everyone
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Routes that don't require authentication
 */
const PUBLIC_ROUTES = [
  '/public',
  '/auth',
  '/events',
  '/clubs',
  '/signup',
  '/about',
  '/contact',
  '/gallery',
  '/api/auth',
  '/',
];

/**
 * Role-based route access mapping
 */
const PROTECTED_ROUTES: Record<string, string[]> = {
  '/student': ['STUDENT'],
  '/club-lead': ['COORDINATOR'], // COORDINATOR role from schema
  '/admin': ['ADMIN'],
};

/**
 * Check if a path matches any public route pattern
 */
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
}

/**
 * Get the required role for a protected route
 */
function getRequiredRole(pathname: string): string[] | null {
  for (const [route, roles] of Object.entries(PROTECTED_ROUTES)) {
    if (pathname.startsWith(route)) {
      return roles;
    }
  }
  return null;
}

/**
 * Main Middleware Function
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp)$/)
  ) {
    return NextResponse.next();
  }

  // ✅ STEP 1: Allow public routes immediately
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // ✅ STEP 2: Get user session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 🔒 STEP 3: Check authentication - redirect to signup if not logged in
  if (!token) {
    // Prevent redirect loop: don't redirect if already on signup
    if (pathname === '/signup' || pathname.startsWith('/signup/')) {
      return NextResponse.next();
    }
    
    const signupUrl = new URL('/signup', request.url);
    signupUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signupUrl);
  }

  // ✅ STEP 4: Check profile completion
  // If profile is incomplete, force completion (except on completion page itself)
  if (token.isProfileComplete === false && pathname !== '/signup/complete') {
    const completeUrl = new URL('/signup/complete', request.url);
    return NextResponse.redirect(completeUrl);
  }

  // ✅ STEP 5: Check role-based authorization
  const requiredRoles = getRequiredRole(pathname);
  
  if (requiredRoles) {
    const userRole = token.role as string;
    
    // Check if user's role is allowed for this route
    if (!requiredRoles.includes(userRole)) {
      // Unauthorized: redirect to 403 forbidden page
      const forbiddenUrl = new URL('/403', request.url);
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  // ✅ All checks passed - allow request
  return NextResponse.next();
}

/**
 * Matcher Configuration
 * Defines which routes the middleware should intercept
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - Static files (_next/static, images, favicon)
     * - API routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
