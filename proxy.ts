import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url))
  }
  if (token && (request.nextUrl.pathname === "/auth/sign-in" || request.nextUrl.pathname === "/auth/sign-up")) {
    return NextResponse.redirect(new URL("/users", request.url))
  }
  NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    "/",
    "/book",
    "/book/:path*",
    "/dashboard",
    "/dashbord/:path*",
    "/post",
    "/post/:path*",
    "/users",
    "/auth/sign-in",
    "/auth/sign-up",
  ],

} 
