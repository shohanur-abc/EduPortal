"use server"

import { cache } from 'react'
import { db } from "@/fatman"

export const topDefaulters = cache(async (academicYear: string = "2025-2026", limit: number = 10) => {
    await db.connect()
    const raw = await db.fee.topDefaulters(academicYear, limit)
    return raw.map((r) => ({
        studentName: r.studentName as string,
        rollNumber: r.rollNumber as string,
        totalDue: r.totalDue as number,
        count: r.count as number,
    }))
})
