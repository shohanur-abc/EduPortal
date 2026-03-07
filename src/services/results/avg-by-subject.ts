import { cache } from 'react'
import { ResultModel } from "@/models/result"
import { connectDB } from '@/lib/db'

export const avgBySubject = cache(async () => {
    await connectDB()
    const data = await ResultModel.avgBySubject()

    return data.map((a) => ({
        subject: a._id as string,
        avgMarks: Math.round(a.avgMarks as number),
        totalExams: a.totalExams as number,
    }))
})
