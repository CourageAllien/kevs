import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================
// DEMO MODE: Authentication bypassed for testing
// ============================================
// All routes are accessible without authentication.
// The demo auth store (client-side) handles user state.
// To re-enable auth, restore the original middleware code.

export default async function middleware(request: NextRequest) {
  // Demo mode: Allow all requests through without authentication
  // Role-based access is handled client-side via demo-auth-store
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
