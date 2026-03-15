"use server"

import { cache } from 'react'
import { db } from "@/fatman"

export const monthlyCollection = cache(async (academicYear: string = "2025-2026") => {
    await db.connect()
    const raw = await db.fee.monthlyCollection(academicYear)
    return raw.map((r) => ({
        month: r._id as string,
        total: r.total as number,
        count: r.count as number,
    }))
})
