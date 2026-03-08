"use server"

import { cache } from 'react'
import { NoticeModel } from "@/models/notice"
import { connectDB } from '@/lib/db'

export const getPriorityBreakdown = cache(async () => {
    await connectDB()
    const raw = await NoticeModel.priorityBreakdown()
    return raw.map((r) => ({
        priority: r._id as string,
        count: r.count as number,
    }))
})
