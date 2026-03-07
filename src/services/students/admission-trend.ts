import { cache } from 'react'
import { StudentModel } from "@/models/student"
import { connectDB } from '@/lib/db'

export const admissionTrend = cache(async (months: number = 12) => {
    await connectDB()
    const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const raw = await StudentModel.admissionTrend(months)
    return raw.map((r) => ({
        month: `${MONTH_NAMES[r._id.month as number]} ${r._id.year}`,
        count: r.count as number,
    }))
})
