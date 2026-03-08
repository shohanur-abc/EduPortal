"use server"

import { UserModel } from "@/models/user"
import { fmtDate } from '@/lib/utils'
import { connectDB } from '@/lib/db'

export async function getRecent(limit: number = 20) {
    await connectDB()
    const users = await UserModel.getRecent(limit)

    return users.map((u) => ({
        _id: String(u._id),
        name: u.name,
        email: u.email,
        role: u.role,
        emailVerified: !!u.emailVerified,
        image: u.image ?? null,
        createdAt: fmtDate(u.createdAt),
    }))
}
