import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Nodemailer from "next-auth/providers/nodemailer"
import { connectDB } from "@/lib/db"
import { User } from "@/models/user"
import { ROUTES } from "@/lib/routes"
import { MongoDBAdapter } from "@/lib/auth-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
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

                const user = await User.findOne({
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
                    image: user.image,
                }
            },
        }),
    ],
    pages: {
        signIn: ROUTES.auth.login,
        error: ROUTES.auth.login,
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                console.log("User logged in:", user)
                token.id = user.id
                token.role = user.role
                token.image = user.image
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
