"use server"

import { ROUTES, signOut } from "@/fatman"

export async function logout() {
    await signOut({ redirectTo: ROUTES.auth.login })
}
