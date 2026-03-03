import 'server-only'

import { cache } from 'react'
import { UserModel } from "@/models/user"
import { fmtDate } from '@/lib/utils'
import { connectDB } from '@/lib/db'

export class User {
    static roleCounts = cache(async () => {
        await connectDB()
        const counts = await UserModel.roleCounts()

        return counts.map((r) => ({
            role: r._id as string,
            count: r.count as number,
        }))
    })

    static async getRecent(limit: number = 20) {
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

    static async getAll() {
        await connectDB()
        const users = await UserModel.getAll()

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

    static async overview() {
        await connectDB()
        const [users, roleCounts] = await Promise.all([
            User.getRecent(),
            User.roleCounts(),
        ])

        return { users, roleCounts }
    }

    static registrationTrend = cache(async (months: number = 6) => {
        await connectDB()
        const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const raw = await UserModel.registrationTrend(months)
        return raw.map((r: { _id: { month: number; year: number }; count: number }) => ({
            month: `${MONTH_NAMES[r._id.month]} ${r._id.year}`,
            count: r.count,
        }))
    })

    static verificationStats = cache(async () => {
        await connectDB()
        const raw = await UserModel.verificationStats()
        const data = raw[0]
        return {
            total: (data?.total as number) ?? 0,
            verified: (data?.verified as number) ?? 0,
            unverified: (data?.unverified as number) ?? 0,
            rate: data ? Math.round(((data.verified as number) / (data.total as number)) * 100 * 10) / 10 : 0,
        }
    })
}
