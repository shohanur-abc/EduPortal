"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getResult = cache(async () => {
    await db.connect()
    const data = await db.result.aggregate([
        { $group: { _id: { exam: "$exam", subject: "$subject" }, avgMarks: { $avg: "$marks" }, count: { $sum: 1 } } },
        { $sort: { "_id.exam": 1, "_id.subject": 1 } },
    ])

    return data.map((d) => ({
        exam: d._id.exam as string,
        subject: d._id.subject as string,
        avgMarks: Math.round(d.avgMarks as number),
        count: d.count as number,
    }))
})
