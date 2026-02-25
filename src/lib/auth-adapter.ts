import { connectDB } from "./db"
import { User } from "@/models/user"
import type { Adapter } from "next-auth/adapters"

/**
 * Minimal MongoDB adapter for Next-auth v5 Email provider
 * Only implements email verification methods - Nodemailer handles user creation
 */
export function MongoDBAdapter(): Adapter {
    return {
        async createVerificationToken(data) {
            await connectDB()
            const user = await User.findOne({ email: data.identifier.toLowerCase() })
            if (!user) {
                // Create user if doesn't exist
                await User.create({
                    email: data.identifier.toLowerCase(),
                    name: "",
                    password: "email-auth-temp",
                    emailVerificationToken: data.token,
                    emailVerificationExpires: new Date(data.expires),
                })
            } else {
                // Update existing user
                user.emailVerificationToken = data.token
                user.emailVerificationExpires = new Date(data.expires)
                await user.save()
            }
            return data
        },

        async useVerificationToken(data) {
            await connectDB()
            const user = await User.findOne({
                email: data.identifier.toLowerCase(),
                emailVerificationToken: data.token,
                emailVerificationExpires: { $gt: new Date() },
            }).select("+emailVerificationToken +emailVerificationExpires")

            if (!user) return null

            // Mark as verified and clear token
            user.emailVerified = true
            user.emailVerificationToken = undefined
            user.emailVerificationExpires = undefined
            await user.save()

            return {
                identifier: user.email,
                token: data.token,
                expires: new Date(),
            }
        },

        async getUserByEmail(email: string) {
            await connectDB()
            const user = await User.findOne({ email: email.toLowerCase() })
            if (!user) return null
            return {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                emailVerified: user.emailVerified ? new Date() : null,
                image: user.image || null,
            }
        },

        // Not implemented - only verification token methods needed
    }
}
