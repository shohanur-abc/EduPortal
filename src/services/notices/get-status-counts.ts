"use server"

import { cache } from 'react'
import { NoticeModel } from "@/models/notice"
import { connectDB } from '@/lib/db'

export const getStatusCounts = cache(async () => {
    await connectDB()
    const counts = await NoticeModel.statusCounts()

    return counts.map((s) => ({
        status: s._id as string,
        count: s.count as number,
    }))
})
