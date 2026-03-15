"use server"

import { db, schemas } from "@/fatman"
import { ActionResult } from "./types"

export async function resetPassword(data: {
    password: string
    confirmPassword: string
    token: string
}): Promise<ActionResult> {
    const validated = schemas.resetPassword.safeParse(data)
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
            resetPasswordToken: data.token,
            resetPasswordExpires: { $gt: new Date() },
        }).select("+resetPasswordToken +resetPasswordExpires")

        if (!user) {
            return {
                success: false,
                message: "Invalid or expired reset token",
            }
        }

        user.password = data.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save()

        return { success: true, message: "Password reset successfully" }
    } catch {
        return { success: false, message: "Something went wrong" }
    }
}
