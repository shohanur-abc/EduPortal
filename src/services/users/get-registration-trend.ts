"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getRegistrationTrend = cache(async (months: number = 6) => {
    await db.connect()
    const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const raw = await db.user.getRegistrationTrend(months)
    return raw.map((r: { _id: { month: number; year: number }; count: number }) => ({
        month: `${MONTH_NAMES[r._id.month]} ${r._id.year}`,
        count: r.count,
    }))
})
