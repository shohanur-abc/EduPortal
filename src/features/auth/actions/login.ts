"use server"

import { signIn } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import { IUser, User } from "@/models/user"
import { ROUTES } from "@/lib/routes"
import { loginSchema } from "../validators/auth"
import { AuthError } from "next-auth"
import { ActionResult } from "./types"

export async function login(data: {
    email: string
    password: string
    callbackUrl?: string
}): Promise<ActionResult> {
    const validated = loginSchema.safeParse({
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
        // Determine redirect destination
        let redirectTo = ROUTES.dashboard.home

        // If callback URL provided (from protected route), use it
        if (data.callbackUrl) {
            redirectTo = data.callbackUrl
        } else {
            // Otherwise, get user info to redirect based on role
            await connectDB()
            const user: IUser | null = await User.findOne({
                email: data.email.toLowerCase(),
            }).select("role")

            redirectTo = ROUTES.dashboard[user?.role || "home"]
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

    return { success: false, message: "Something went wrong" }
}
