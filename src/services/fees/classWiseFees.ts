import 'server-only'

import { cache } from 'react'
import { FeeModel } from "@/models/fee"
import { connectDB } from '@/lib/db'

export const classWiseFees = cache(async (academicYear: string = "2025-2026") => {
    await connectDB()
    const raw = await FeeModel.classWiseFees(academicYear)
    return raw.map((r) => ({
        className: r.className as string,
        totalFees: r.totalFees as number,
        collected: r.collected as number,
        pending: r.pending as number,
        studentCount: r.studentCount as number,
        collectionRate: r.totalFees > 0 ? Math.round((r.collected / r.totalFees) * 100 * 10) / 10 : 0,
    }))
})
