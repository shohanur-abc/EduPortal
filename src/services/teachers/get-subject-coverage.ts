"use server"

import { cache } from 'react'
import { TeacherModel } from "@/models/teacher"
import { connectDB } from '@/lib/db'

export const getSubjectCoverage = cache(async () => {
    await connectDB()
    const raw = await TeacherModel.subjectCoverage()
    return raw.map((r) => ({
        subject: r._id as string,
        count: r.count as number,
        activeCount: r.activeCount as number,
    }))
})
