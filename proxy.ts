import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedPaths = ["/book", "/post", "/users"]
const authPaths = ["/auth/sign-in", "/auth/sign-up"]

function isProtected(pathname: string) {
  return protectedPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const { pathname } = request.nextUrl

  if (authPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/users", request.url))
  } else if (isProtected(pathname) && !token) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/book",
    "/book/:path*",
    "/post",
    "/post/:path*",
    "/users",
    "/auth/sign-in",
    "/auth/sign-up",
  ],
}
