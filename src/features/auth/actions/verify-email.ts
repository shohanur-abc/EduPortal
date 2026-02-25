"use server"

import { connectDB } from "@/lib/db"
import { User } from "@/models/user"
import { verifyEmailSchema } from "../validators/auth"
import { ActionResult } from "./types"

export async function verifyEmail(data: {
    code: string
    email: string
}): Promise<ActionResult> {
    const validated = verifyEmailSchema.safeParse(data)
    if (!validated.success) {
        return {
            success: false,
            message: "Invalid input",
            errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
        }
    }

    try {
        await connectDB()

        const user = await User.findOne({
            email: data.email.toLowerCase(),
            emailVerificationToken: data.code,
            emailVerificationExpires: { $gt: new Date() },
        }).select("+emailVerificationToken +emailVerificationExpires")

        if (!user) {
            return {
                success: false,
                message: "Invalid or expired verification code",
            }
        }

        user.emailVerified = true
        user.emailVerificationToken = undefined
        user.emailVerificationExpires = undefined
        await user.save()

        return { success: true, message: "Email verified successfully" }
    } catch {
        return { success: false, message: "Something went wrong" }
    }
}
