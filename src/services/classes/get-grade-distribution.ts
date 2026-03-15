"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getGradeDistribution = cache(async () => {
    await db.connect()
    const raw = await db.class.gradeDistribution()
    return raw.map((r) => ({
        grade: r._id as number,
        sections: r.sections as number,
        totalStudents: r.totalStudents as number,
        totalCapacity: r.totalCapacity as number,
    }))
})
