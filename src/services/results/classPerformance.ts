import 'server-only'

import { cache } from 'react'
import { ResultModel } from "@/models/result"
import { connectDB } from '@/lib/db'

export const classPerformance = cache(async () => {
    await connectDB()
    const raw = await ResultModel.classPerformance()
    return raw.map((r) => ({
        className: r.className as string,
        avgMarks: r.avgMarks as number,
        maxMarks: r.maxMarks as number,
        minMarks: r.minMarks as number,
        studentCount: r.studentCount as number,
        passRate: r.passRate as number,
    }))
})
