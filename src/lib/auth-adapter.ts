import { connectDB } from "./db"
import { UserModel } from "@/models/user"
import type { Adapter, AdapterUser } from "next-auth/adapters"

// ============= HELPERS =============
function toAdapterUser(user: {
    _id: { toString(): string }
    email: string
    name: string
    emailVerified: Date | null
    image?: string | null
}): AdapterUser {
    return {
        id: user._id.toString(),
        email: user.email,
        name: user.name ?? null,
        emailVerified: user.emailVerified ?? null,
        image: user.image ?? null,
    }
}

/**
 * Full MongoDB adapter for Next-Auth v5
 * Supports Credentials, Google OAuth, and Nodemailer (magic link)
 */
export function MongoDBAdapter(): Adapter {
    return {
        // ===== USER METHODS =====

        async createUser(user) {
            await connectDB()
            const newUser = await UserModel.create({
                email: user.email.toLowerCase(),
                name: user.name ?? "",
                emailVerified: user.emailVerified ?? null,
                image: user.image ?? null,
            })
            return toAdapterUser(newUser)
        },

        async getUser(id) {
            await connectDB()
            const user = await UserModel.findById(id)
            if (!user) return null
            return toAdapterUser(user)
        },

        async getUserByEmail(email) {
            await connectDB()
            const user = await UserModel.findOne({ email: email.toLowerCase() })
            if (!user) return null
            return toAdapterUser(user)
        },

        async getUserByAccount({ provider, providerAccountId }) {
            await connectDB()
            // Query works even with select:false — only projection is affected
            const user = await UserModel.findOne({
                accounts: { $elemMatch: { provider, providerAccountId } },
            })
            if (!user) return null
            return toAdapterUser(user)
        },

        async updateUser(user) {
            await connectDB()
            const updated = await UserModel.findByIdAndUpdate(
                user.id,
                {
                    ...(user.name !== undefined && { name: user.name }),
                    ...(user.email !== undefined && { email: user.email.toLowerCase() }),
                    ...(user.emailVerified !== undefined && { emailVerified: user.emailVerified }),
                    ...(user.image !== undefined && { image: user.image }),
                },
                { new: true }
            )
            if (!updated) throw new Error(`User ${user.id} not found`)
            return toAdapterUser(updated)
        },

        // ===== ACCOUNT METHODS =====

        async linkAccount(account) {
            await connectDB()
            await UserModel.findByIdAndUpdate(account.userId, {
                $addToSet: {
                    accounts: {
                        type: account.type,
                        provider: account.provider,
                        providerAccountId: account.providerAccountId,
                    },
                },
            })
            return account
        },

        // ===== VERIFICATION TOKEN METHODS =====

        async createVerificationToken(data) {
            await connectDB()
            const existing = await UserModel.findOne({ email: data.identifier.toLowerCase() })
            if (existing) {
                existing.emailVerificationToken = data.token
                existing.emailVerificationExpires = new Date(data.expires)
                await existing.save()
            } else {
                // Create placeholder user — password is optional now
                await UserModel.create({
                    email: data.identifier.toLowerCase(),
                    name: "",
                    emailVerificationToken: data.token,
                    emailVerificationExpires: new Date(data.expires),
                })
            }
            return data
        },

        async useVerificationToken(data) {
            await connectDB()
            const user = await UserModel.findOne({
                email: data.identifier.toLowerCase(),
                emailVerificationToken: data.token,
                emailVerificationExpires: { $gt: new Date() },
            }).select("+emailVerificationToken +emailVerificationExpires")

            if (!user) return null

            user.emailVerified = new Date()
            user.emailVerificationToken = undefined
            user.emailVerificationExpires = undefined
            await user.save()

            return {
                identifier: user.email,
                token: data.token,
                expires: new Date(),
            }
        },
    }
}
