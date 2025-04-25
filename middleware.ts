import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // Check if this is a direct access from the demo account
  const isDemoAccess = request.cookies.get("demo_access")?.value === "true"

  // If it's demo access, allow direct access to dashboard
  if (isDemoAccess && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next()
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const isAuthenticated = !!token
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth/")

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect unauthenticated users to sign in page if they try to access protected routes
  if (!isAuthenticated && request.nextUrl.pathname.startsWith("/dashboard")) {
    // For development purposes, allow direct access to dashboard
    // Remove this in production
    if (process.env.NODE_ENV === "development") {
      return NextResponse.next()
    }

    const redirectUrl = new URL("/auth/signin", request.url)
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}
