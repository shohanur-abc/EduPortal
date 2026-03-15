"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getStatusBreakdown = cache(async () => {
    await db.connect()
    const raw = await db.student.statusBreakdown()
    return raw.map((r) => ({
        status: r._id as string,
        count: r.count as number,
    }))
})
