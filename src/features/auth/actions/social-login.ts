"use server"

import { signIn } from "@/lib/auth"
import { ROUTES } from "@/lib/routes"

export async function socialLogin(provider: string) {
    await signIn(provider, {
        redirectTo: ROUTES.dashboard.home,
    })
}


export async function socialLogin2(formData: FormData) {
    console.log("Provider:", formData.get("provider"))
    await signIn(formData.get("provider") as string, {
        redirectTo: ROUTES.dashboard.home,
    })
}

