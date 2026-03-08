"use server"

import { cache } from 'react'
import { ResultModel } from "@/models/result"
import { connectDB } from '@/lib/db'

export const getTopPerformers = cache(async (limit: number = 10) => {
    await connectDB()
    const raw = await ResultModel.topPerformers(limit)
    return raw.map((r) => ({
        studentName: r.studentName as string,
        rollNumber: r.rollNumber as string,
        className: r.className as string,
        avgMarks: r.avgMarks as number,
        totalExams: r.totalExams as number,
    }))
})
