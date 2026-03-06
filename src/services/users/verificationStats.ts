import 'server-only'

import { cache } from 'react'
import { UserModel } from "@/models/user"
import { connectDB } from '@/lib/db'

export const verificationStats = cache(async () => {
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
