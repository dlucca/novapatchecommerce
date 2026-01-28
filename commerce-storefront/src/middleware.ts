import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getLocaleFromCountryCode } from "./i18n"

export default clerkMiddleware(async (_auth, req: NextRequest) => {
  const { pathname } = req.nextUrl

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next()
  }

  // Extraer countryCode de la URL (formato: /mx/... o /br/...)
  const countryCodeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/)

  if (countryCodeMatch) {
    const countryCode = countryCodeMatch[1]
    const locale = getLocaleFromCountryCode(countryCode)
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set("x-next-intl-locale", locale)
    requestHeaders.set("x-country-code", countryCode)

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    response.headers.set("x-next-intl-locale", locale)
    response.headers.set("x-country-code", countryCode)

    return response
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
