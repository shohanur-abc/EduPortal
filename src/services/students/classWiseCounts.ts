import 'server-only'

import { cache } from 'react'
import { StudentModel } from "@/models/student"
import { connectDB } from '@/lib/db'

export const classWiseCounts = cache(async () => {
    await connectDB()
    const raw = await StudentModel.classWiseCounts()
    return raw.map((r) => ({
        className: `${r._id.className} ${r._id.section}`,
        grade: r._id.grade as number,
        count: r.count as number,
        maleCount: r.maleCount as number,
        femaleCount: r.femaleCount as number,
    }))
})
