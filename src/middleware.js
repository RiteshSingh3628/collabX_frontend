import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { getProxyRedirect } from "@/lib/utils/routeProxy";

export async function middleware(req) {
  // `getToken` extracts the session/token securely using the NextAuth secret
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET 
  });

  // Call the proxy utility function to evaluate state and routes
  const redirectUrl = getProxyRedirect(req.url, token);

  if (redirectUrl) {
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/auth|api/instagram|_next/static|_next/image|favicon.ico).*)',
  ],
};
