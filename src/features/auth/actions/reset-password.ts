"use server"

import { connectDB } from "@/lib/db"
import { User } from "@/models/user"
import { resetPasswordSchema } from "../validators/auth"
import { ActionResult } from "./types"

export async function resetPassword(data: {
    password: string
    confirmPassword: string
    token: string
}): Promise<ActionResult> {
    const validated = resetPasswordSchema.safeParse(data)
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
