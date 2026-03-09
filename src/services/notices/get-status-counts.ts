"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getStatusCounts = cache(async () => {
    await db.connect()
    const counts = await db.notice.statusCounts()

    return counts.map((s) => ({
        status: s._id as string,
        count: s.count as number,
    }))
})
