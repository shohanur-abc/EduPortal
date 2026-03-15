import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { ROUTES } from "@/lib/routes"

const authRoutes = [ROUTES.auth.login, ROUTES.auth.signup]
const protectedRoutes = ["/dashboard"]

export const proxy = auth(function proxy(req) {
    const { nextUrl } = req
    const { pathname } = nextUrl
    const isLoggedIn = !!req.auth?.user

    // Redirect to login if accessing protected routes without auth
    if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isLoggedIn) {
        const loginUrl = new URL(ROUTES.auth.login, req.url)
        loginUrl.searchParams.set("callbackUrl", pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Redirect to dashboard if accessing auth pages while logged in
    if (authRoutes.some((route) => pathname.startsWith(route)) && isLoggedIn) {
        return NextResponse.redirect(new URL(ROUTES.dashboard.home, req.url))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
