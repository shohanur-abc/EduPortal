"use server"

import { cache } from 'react'
import { db } from "@/fatman"

export const paymentMethodBreakdown = cache(async (academicYear: string = "2025-2026") => {
    await db.connect()
    const raw = await db.fee.paymentMethodBreakdown(academicYear)
    return raw.map((r) => ({
        method: r._id as string,
        total: r.total as number,
        count: r.count as number,
    }))
})
