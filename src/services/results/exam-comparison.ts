import { cache } from 'react'
import { ResultModel } from "@/models/result"
import { connectDB } from '@/lib/db'

export const examComparison = cache(async () => {
    await connectDB()
    const raw = await ResultModel.examComparison()
    return raw.map((r) => ({
        exam: r.exam as string,
        avgMarks: r.avgMarks as number,
        maxMarks: r.maxMarks as number,
        minMarks: r.minMarks as number,
        studentCount: r.studentCount as number,
        passRate: r.passRate as number,
    }))
})
