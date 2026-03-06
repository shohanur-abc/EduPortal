import 'server-only'

import { cache } from 'react'
import { StudentModel } from "@/models/student"
import { connectDB } from '@/lib/db'

export const statusBreakdown = cache(async () => {
    await connectDB()
    const raw = await StudentModel.statusBreakdown()
    return raw.map((r) => ({
        status: r._id as string,
        count: r.count as number,
    }))
})
