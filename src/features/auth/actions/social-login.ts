"use server"

import { signIn } from "@/lib/auth"
import { ROUTES } from "@/lib/routes"

export async function socialLogin(provider: string) {
    await signIn(provider, {
        redirectTo: ROUTES.dashboard.home,
    })
}
