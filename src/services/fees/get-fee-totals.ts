"use server"

import { cache } from 'react'
import { db } from "@/fatman"

export const feeTotals = cache(async (academicYear: string = "2025-2026") => {
    await db.connect()
    const totals = await db.fee.feeTotals(academicYear)

    return {
        total: totals[0]?.total ?? 0,
        collected: totals[0]?.collected ?? 0,
    }
})
