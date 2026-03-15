"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getVerificationStats = cache(async () => {
    await db.connect()
    const raw = await db.user.getVerificationStats()
    const data = raw[0]
    return {
        total: (data?.total as number) ?? 0,
        verified: (data?.verified as number) ?? 0,
        unverified: (data?.unverified as number) ?? 0,
        rate: data ? Math.round(((data.verified as number) / (data.total as number)) * 100 * 10) / 10 : 0,
    }
})
