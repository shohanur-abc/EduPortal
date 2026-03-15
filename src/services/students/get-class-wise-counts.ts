"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getClassWiseCounts = cache(async () => {
    await db.connect()
    const raw = await db.student.classWiseCounts()
    return raw.map((r) => ({
        className: `${r._id.className} ${r._id.section}`,
        grade: r._id.grade as number,
        count: r.count as number,
        maleCount: r.maleCount as number,
        femaleCount: r.femaleCount as number,
    }))
})
