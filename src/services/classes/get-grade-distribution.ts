"use server"

import { cache } from 'react'
import { ClassModel } from "@/models/class"
import { connectDB } from '@/lib/db'

export const getGradeDistribution = cache(async () => {
    await connectDB()
    const raw = await ClassModel.gradeDistribution()
    return raw.map((r) => ({
        grade: r._id as number,
        sections: r.sections as number,
        totalStudents: r.totalStudents as number,
        totalCapacity: r.totalCapacity as number,
    }))
})
