import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { jwtUtils } from "./lib/jwt";

const AUTH_ROUTES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;

  // Only protect login and registration routes
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!isAuthRoute) {
    return NextResponse.next();
  }

  // Allow unauthenticated users
  if (!accessToken) {
    return NextResponse.next();
  }

  try {
    const decodedToken = await jwtUtils.verifyToken(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string,
    );

    // Valid token: redirect away from login/register
    if (decodedToken?.success) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch {
    // Invalid or expired token: allow login/register
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/login/:path*", "/register/:path*"],
};
