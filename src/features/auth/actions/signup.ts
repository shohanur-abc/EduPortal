"use server"

import { connectDB } from "@/lib/db"
import { User } from "@/models/user"
import { signupSchema } from "../validators/auth"
import { sendVerificationEmail } from "@/lib/email"
import crypto from "crypto"
import { ActionResult } from "./types"

export async function signup(data: {
    name: string
    email: string
    password: string
    confirmPassword: string
    role: string
    acceptTerms: true
}): Promise<ActionResult> {
    const validated = signupSchema.safeParse(data)
    if (!validated.success) {
        return {
            success: false,
            message: "Invalid input",
            errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
        }
    }

    try {
        await connectDB()

        const existingUser = await User.findOne({
            email: data.email.toLowerCase(),
        })
        if (existingUser) {
            return { success: false, message: "Email already in use" }
        }

        const verificationToken = crypto.randomBytes(3).toString("hex")

        await User.create({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            emailVerificationToken: verificationToken,
            emailVerificationExpires: new Date(
                Date.now() + 24 * 60 * 60 * 1000
            ),
        })

        // Send verification email with token
        await sendVerificationEmail(data.email, verificationToken, data.name)

        return { success: true, message: "Account created successfully. Check your email to verify your account." }
    } catch {
        return { success: false, message: "Something went wrong" }
    }
}
