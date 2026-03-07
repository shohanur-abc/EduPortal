import { cache } from 'react'
import { FeeModel } from "@/models/fee"
import { connectDB } from '@/lib/db'

export const statusBreakdown = cache(async (academicYear: string = "2025-2026") => {
    await connectDB()
    const breakdown = await FeeModel.statusBreakdown(academicYear)

    return breakdown.map((s) => ({
        status: s._id as string,
        count: s.count as number,
        total: s.total as number,
        collected: s.collected as number,
    }))
})
