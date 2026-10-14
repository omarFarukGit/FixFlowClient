import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const AUTH_ROUTES = ["/login", "/register"];

const ROLE_DASHBOARDS: Record<string, string> = {
  CUSTOMER: "/customer",
  TECHNICIAN: "/technician",
  ADMIN: "/admin",
};

const PUBLIC_ROUTES = [
  "/",
  "/services",
  "/about",
  "/contact",
  "/login",
  "/register",
  "/how-work-it",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const secret = process.env.JWT_ACCESS_SECRET;

  let role: string | undefined;
  let isAuthenticated = false;

  if (accessToken && secret) {
    try {
      const decoded = jwt.verify(accessToken, secret);

      if (typeof decoded !== "string") {
        role = decoded.role;
        isAuthenticated = true;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isAuthRoute && isAuthenticated && role) {
    const dashboard = ROLE_DASHBOARDS[role];

    if (dashboard) {
      return NextResponse.redirect(new URL(dashboard, request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      pathname === route || (route !== "/" && pathname.startsWith(`${route}/`)),
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
