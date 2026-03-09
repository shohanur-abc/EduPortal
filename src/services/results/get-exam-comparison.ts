"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getExamComparison = cache(async () => {
    await db.connect()
    const raw = await db.result.examComparison()
    return raw.map((r) => ({
        exam: r.exam as string,
        avgMarks: r.avgMarks as number,
        maxMarks: r.maxMarks as number,
        minMarks: r.minMarks as number,
        studentCount: r.studentCount as number,
        passRate: r.passRate as number,
    }))
})
