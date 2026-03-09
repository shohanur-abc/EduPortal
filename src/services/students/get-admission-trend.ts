"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getAdmissionTrend = cache(async (months: number = 12) => {
    await db.connect()
    const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const raw = await db.student.admissionTrend(months)
    return raw.map((r) => ({
        month: `${MONTH_NAMES[r._id.month as number]} ${r._id.year}`,
        count: r.count as number,
    }))
})
