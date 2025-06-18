import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = (await cookies()).get('token')?.value;

  // If the user is not authenticated and trying to access a protected route
  if (!token) {
    // Redirect them to the sign-in page
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  // Continue with the request if everything is fine
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [],
}; 