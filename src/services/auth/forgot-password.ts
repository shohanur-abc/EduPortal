"use server"

import { db, schemas, sendResetPasswordEmail } from "@/fatman"
import crypto from "crypto"
import { ActionResult } from "./types"

export async function forgotPassword(data: {
    email: string
}): Promise<ActionResult> {
    const validated = schemas.forgotPassword.safeParse(data)
    if (!validated.success) {
        return {
            success: false,
            message: "Invalid input",
            errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
        }
    }

    try {
        await db.connect()

        const user = await db.user.findOne({
            email: data.email.toLowerCase(),
        })

        if (!user) {
            return {
                success: true,
                message: "If an account with that email exists, a reset link has been sent",
            }
        }

        const resetToken = crypto.randomBytes(32).toString("hex")
        user.resetPasswordToken = resetToken
        user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000)
        await user.save()

        await sendResetPasswordEmail(user.email, resetToken, user.name)

        return {
            success: true,
            message: "If an account with that email exists, a reset link has been sent",
        }
    } catch {
        return { success: false, message: "Something went wrong" }
    }
}
