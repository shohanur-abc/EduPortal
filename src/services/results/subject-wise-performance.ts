import { cache } from 'react'
import { ResultModel } from "@/models/result"
import { connectDB } from '@/lib/db'

export const subjectWisePerformance = cache(async () => {
    await connectDB()
    const raw = await ResultModel.subjectWisePerformance()
    return raw.map((r) => ({
        subject: r.subject as string,
        avgMarks: r.avgMarks as number,
        maxMarks: r.maxMarks as number,
        minMarks: r.minMarks as number,
        passRate: r.passRate as number,
        failCount: r.failCount as number,
        total: r.total as number,
    }))
})
