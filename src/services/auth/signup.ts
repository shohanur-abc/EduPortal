"use server"

import { db, schemas, sendVerificationEmail } from "@/fatman"
import crypto from "crypto"
import { ActionResult } from "./types"

export async function signup(data: {
    email: string
    password: string
    confirmPassword: string
    role: string
    acceptTerms: true
    firstName: string
    lastName: string
    username: string
    gender: "male" | "female" | "other"
    dateOfBirth?: string
    avatar?: string
}): Promise<ActionResult> {
    const validated = schemas.signup.safeParse(data)
    if (!validated.success) {
        return {
            success: false,
            message: "Invalid input",
            errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
        }
    }

    try {
        await db.connect()

        const existingUser = await db.user.findOne({
            $or: [
                { email: data.email.toLowerCase() },
                { username: data.username.toLowerCase() }
            ],
        })
        if (existingUser) {
            return { success: false, message: "Email or username already in use" }
        }

        const verificationToken = crypto.randomBytes(3).toString("hex")
        const fullName = `${data.firstName} ${data.lastName}`

        await db.user.create({
            name: fullName,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            password: data.password,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
            avatar: data.avatar,
            role: data.role,
            emailVerificationToken: verificationToken,
            emailVerificationExpires: new Date(
                Date.now() + 24 * 60 * 60 * 1000
            ),
        })

        await sendVerificationEmail(data.email, verificationToken, fullName)

        return { success: true, message: "Account created successfully. Check your email to verify your account." }
    } catch (error) {
        console.error("Signup error:", error)
        return { success: false, message: "Something went wrong" }
    }
}
