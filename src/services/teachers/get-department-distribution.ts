"use server"

import { cache } from 'react'
import { TeacherModel } from "@/models/teacher"
import { connectDB } from '@/lib/db'

export const getDepartmentDistribution = cache(async () => {
    await connectDB()
    const raw = await TeacherModel.departmentDistribution()
    return raw.map((r) => ({
        department: r._id as string,
        count: r.count as number,
    }))
})
