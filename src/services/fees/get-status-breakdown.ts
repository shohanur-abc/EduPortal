"use server"

import { cache } from 'react'
import { db } from "@/fatman"

export const statusBreakdown = cache(async (academicYear: string = "2025-2026") => {
    await db.connect()
    const breakdown = await db.fee.statusBreakdown(academicYear)

    return breakdown.map((s) => ({
        status: s._id as string,
        count: s.count as number,
        total: s.total as number,
        collected: s.collected as number,
    }))
})
