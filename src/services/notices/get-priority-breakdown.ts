"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getPriorityBreakdown = cache(async () => {
    await db.connect()
    const raw = await db.notice.priorityBreakdown()
    return raw.map((r) => ({
        priority: r._id as string,
        count: r.count as number,
    }))
})
