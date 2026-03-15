import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Nodemailer from "next-auth/providers/nodemailer"
import { connectDB } from "@/lib/db"
import { UserModel } from "@/models/user"
import { ROUTES } from "@/lib/routes"
import { MongoDBAdapter } from "@/lib/auth-adapter"

const trustHost = process.env.NODE_ENV === "production" || !!process.env.NEXTAUTH_URL

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    basePath: "/api/auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    adapter: MongoDBAdapter(),
    providers: [
        Google,
        Nodemailer({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null

                await connectDB()

                const user = await UserModel.findOne({
                    email: (credentials.email as string).toLowerCase(),
                }).select("+password")

                if (!user) return null

                const isValid = await user.comparePassword(
                    credentials.password as string
                )
                if (!isValid) return null

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    image: user.image ?? null,
                }
            },
        }),
    ],
    pages: {
        signIn: ROUTES.auth.login,
        error: ROUTES.auth.login,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                // Credentials login returns role directly; OAuth users need DB lookup
                const extUser = user as { role?: string; image?: string | null }
                if (extUser.role) {
                    token.role = extUser.role
                    token.image = extUser.image ?? null
                } else {
                    await connectDB()
                    const dbUser = await UserModel.findById(user.id)
                    token.role = dbUser?.role ?? "student"
                    token.image = user.image ?? dbUser?.image ?? null
                }
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
                session.user.image = token.image as string
            }
            return session
        },
    },
    session: {
        strategy: "jwt",
    },
})
