"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getClassPerformance = cache(async () => {
    await db.connect()
    const raw = await db.result.classPerformance()
    return raw.map((r) => ({
        className: r.className as string,
        avgMarks: r.avgMarks as number,
        maxMarks: r.maxMarks as number,
        minMarks: r.minMarks as number,
        studentCount: r.studentCount as number,
        passRate: r.passRate as number,
    }))
})
