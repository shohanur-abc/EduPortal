import { cache } from 'react'
import { ResultModel } from "@/models/result"
import { connectDB } from '@/lib/db'

export const gradeDistribution = cache(async () => {
    await connectDB()
    const distribution = await ResultModel.gradeDistribution()

    return distribution.map((g) => ({
        grade: g._id as string,
        count: g.count as number,
    }))
})
