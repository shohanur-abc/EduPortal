"use server"

import { db } from '@/fatman'
import { fmtDate } from '@/fatman/utils'

export async function getRecent(limit: number = 20) {
    await db.connect()
    const users = await db.user.getRecent(limit)

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
