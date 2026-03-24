"use server"

import { ROUTES, signIn } from "@/fatman"

export async function socialLogin(provider: string) {
    await signIn(provider, {
        redirectTo: ROUTES.dashboard.home,
    })
}

export async function socialLogin2(formData: FormData) {
    await signIn(formData.get("provider") as string, {
        redirectTo: ROUTES.dashboard.home,
    })
}
