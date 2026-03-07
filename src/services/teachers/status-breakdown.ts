import { cache } from 'react'
import { TeacherModel } from "@/models/teacher"
import { connectDB } from '@/lib/db'

export const statusBreakdown = cache(async () => {
    await connectDB()
    const raw = await TeacherModel.statusBreakdown()
    return raw.map((r) => ({
        status: r._id as string,
        count: r.count as number,
    }))
})
