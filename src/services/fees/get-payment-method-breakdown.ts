import { cache } from 'react'
import { FeeModel } from "@/models/fee"
import { connectDB } from '@/lib/db'

export const paymentMethodBreakdown = cache(async (academicYear: string = "2025-2026") => {
    await connectDB()
    const raw = await FeeModel.paymentMethodBreakdown(academicYear)
    return raw.map((r) => ({
        method: r._id as string,
        total: r.total as number,
        count: r.count as number,
    }))
})
