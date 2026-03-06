import 'server-only'

import { cache } from 'react'
import { UserModel } from "@/models/user"
import { connectDB } from '@/lib/db'

export const registrationTrend = cache(async (months: number = 6) => {
    await connectDB()
    const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const raw = await UserModel.registrationTrend(months)
    return raw.map((r: { _id: { month: number; year: number }; count: number }) => ({
        month: `${MONTH_NAMES[r._id.month]} ${r._id.year}`,
        count: r.count,
    }))
})
