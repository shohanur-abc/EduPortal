"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getPublishTrend = cache(async (months: number = 6) => {
    await db.connect()
    const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const raw = await db.notice.publishTrend(months)
    return raw.map((r) => ({
        month: `${MONTH_NAMES[r._id.month as number]} ${r._id.year}`,
        count: r.count as number,
        published: r.published as number,
    }))
})
