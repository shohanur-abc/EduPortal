"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getAvgBySubject = cache(async () => {
    await db.connect()
    const data = await db.result.avgBySubject()

    return data.map((a) => ({
        subject: a._id as string,
        avgMarks: Math.round(a.avgMarks as number),
        totalExams: a.totalExams as number,
    }))
})
