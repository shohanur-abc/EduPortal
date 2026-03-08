"use server"

import { cache } from 'react'
import { NoticeModel } from "@/models/notice"
import { connectDB } from '@/lib/db'

export const getPublishTrend = cache(async (months: number = 6) => {
    await connectDB()
    const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const raw = await NoticeModel.publishTrend(months)
    return raw.map((r) => ({
        month: `${MONTH_NAMES[r._id.month as number]} ${r._id.year}`,
        count: r.count as number,
        published: r.published as number,
    }))
})
