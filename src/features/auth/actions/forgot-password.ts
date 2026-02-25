"use server"

import { connectDB } from "@/lib/db"
import { User } from "@/models/user"
import { forgotPasswordSchema } from "../validators/auth"
import { sendResetPasswordEmail } from "@/lib/email"
import crypto from "crypto"
import { ActionResult } from "./types"

export async function forgotPassword(data: {
    email: string
}): Promise<ActionResult> {
    const validated = forgotPasswordSchema.safeParse(data)
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
        })

        if (!user) {
            // Don't reveal if email exists
            return {
                success: true,
                message: "If an account with that email exists, a reset link has been sent",
            }
        }

        const resetToken = crypto.randomBytes(32).toString("hex")
        user.resetPasswordToken = resetToken
        user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000)
        await user.save()

        // Send reset email with link
        await sendResetPasswordEmail(user.email, resetToken, user.name)

        return {
            success: true,
            message: "If an account with that email exists, a reset link has been sent",
        }
    } catch {
        return { success: false, message: "Something went wrong" }
    }
}
