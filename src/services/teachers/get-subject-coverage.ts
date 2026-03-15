"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getSubjectCoverage = cache(async () => {
    await db.connect()
    const raw = await db.teacher.subjectCoverage()
    return raw.map((r) => ({
        subject: r._id as string,
        count: r.count as number,
        activeCount: r.activeCount as number,
    }))
})
