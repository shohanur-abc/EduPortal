"use server"

import { cache } from 'react'
import { AttendanceModel } from "@/models/attendance"
import { connectDB } from '@/lib/db'

export const getReport = cache(async (limit: number = 100) => {
    await connectDB()
    const data = await AttendanceModel.reportByDateStatus(limit)

    return data.map((d) => ({
        date: d._id.date as string,
        status: d._id.status as string,
        count: d.count as number,
    }))
})
