import 'server-only'

import { cache } from 'react'
import { FeeModel } from "@/models/fee"
import { connectDB } from '@/lib/db'

export const feeTotals = cache(async (academicYear: string = "2025-2026") => {
    await connectDB()
    const totals = await FeeModel.feeTotals(academicYear)

    return {
        total: totals[0]?.total ?? 0,
        collected: totals[0]?.collected ?? 0,
    }
})
