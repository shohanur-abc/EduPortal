"use server"

import { cache } from 'react'
import { FeeModel } from "@/models/fee"
import { connectDB } from '@/lib/db'

export const topDefaulters = cache(async (academicYear: string = "2025-2026", limit: number = 10) => {
    await connectDB()
    const raw = await FeeModel.topDefaulters(academicYear, limit)
    return raw.map((r) => ({
        studentName: r.studentName as string,
        rollNumber: r.rollNumber as string,
        totalDue: r.totalDue as number,
        count: r.count as number,
    }))
})
