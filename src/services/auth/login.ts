"use server"

import { db, ROUTES, schemas, signIn } from "@/fatman"
import { AuthError } from "next-auth"
import { ActionResult } from "./types"

export async function login(data: {
    email: string
    password: string
    callbackUrl?: string
}): Promise<ActionResult> {
    const validated = schemas.login.safeParse({
        email: data.email,
        password: data.password,
    })
    if (!validated.success) {
        return {
            success: false,
            message: "Invalid input",
            errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
        }
    }

    try {
        let redirectTo = ROUTES.dashboard.home

        if (data.callbackUrl) {
            redirectTo = data.callbackUrl
        } else {
            await db.connect()
            const user = await db.user.findOne({
                email: data.email.toLowerCase(),
            }).select("role")
            if (user?.role) {
                const roleRoute = ROUTES.dashboard[user.role as keyof typeof ROUTES.dashboard]
                if (typeof roleRoute === "string") {
                    redirectTo = roleRoute
                }
            }
        }

        await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirectTo: redirectTo,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            return { success: false, message: "Invalid email or password" }
        }
        throw error
    }

    return { success: false, message: "Login failed" }
}
