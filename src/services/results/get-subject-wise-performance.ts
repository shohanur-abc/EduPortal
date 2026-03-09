"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getSubjectWisePerformance = cache(async () => {
    await db.connect()
    const raw = await db.result.subjectWisePerformance()
    return raw.map((r) => ({
        subject: r.subject as string,
        avgMarks: r.avgMarks as number,
        maxMarks: r.maxMarks as number,
        minMarks: r.minMarks as number,
        passRate: r.passRate as number,
        failCount: r.failCount as number,
        total: r.total as number,
    }))
})
