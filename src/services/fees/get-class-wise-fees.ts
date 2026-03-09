"use server"

import { cache } from 'react'
import { db } from "@/fatman"

export const classWiseFees = cache(async (academicYear: string = "2025-2026") => {
    await db.connect()
    const raw = await db.fee.classWiseFees(academicYear)
    return raw.map((r) => ({
        className: r.className as string,
        totalFees: r.totalFees as number,
        collected: r.collected as number,
        pending: r.pending as number,
        studentCount: r.studentCount as number,
        collectionRate: r.totalFees > 0 ? Math.round((r.collected / r.totalFees) * 100 * 10) / 10 : 0,
    }))
})
