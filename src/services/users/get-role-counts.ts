"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getRoleCounts = cache(async () => {
    await db.connect()
    const counts = await db.user.roleCounts()

    return counts.map((r) => ({
        role: r._id as string,
        count: r.count as number,
    }))
})
