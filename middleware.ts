import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // ✅ UPDATED: Added '/' to public paths
  // Now '/' (Landing Page) and '/login' are visible to everyone
  const isPublicPath = path === '/login' || path === '/' ;

  // 1. Get the token from the cookie
  const token = request.cookies.get('token')?.value || '';

  // 2. Verify the Token
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default_secret_key'
  );

  let isValid = false;
  if (token) {
    try {
      await jwtVerify(token, secret);
      isValid = true;
    } catch (error) {
      isValid = false;
    }
  }

  // 3. Logic: Protect Private Routes
  // If user is NOT logged in and trying to access a private page (like /dashboard)
  if (!isPublicPath && !isValid) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. Logic: Redirect Logged-In Users ONLY from Login page
  // If user IS logged in, we only kick them out of '/login'.
  // We let them see the Landing Page ('/') if they want.
  if (path === '/login' && isValid) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// 5. Matcher Configuration
export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/:path*',
    '/orders/:path*',
    '/inventory/:path*',
    '/customers/:path*',
    '/delivery/:path*',
    '/settings/:path*',
    '/profile/:path*'
  ]
}