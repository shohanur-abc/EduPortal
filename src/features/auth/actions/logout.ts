"use server"

import { signOut } from "@/lib/auth"
import { ROUTES } from "@/lib/routes"

export async function logout() {
    await signOut({ redirectTo: ROUTES.auth.login })
}
