"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getTopPerformers = cache(async (limit: number = 10) => {
    await db.connect()
    const raw = await db.result.topPerformers(limit)
    return raw.map((r) => ({
        studentName: r.studentName as string,
        rollNumber: r.rollNumber as string,
        className: r.className as string,
        avgMarks: r.avgMarks as number,
        totalExams: r.totalExams as number,
    }))
})
