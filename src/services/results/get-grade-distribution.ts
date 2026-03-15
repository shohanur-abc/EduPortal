"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getGradeDistribution = cache(async () => {
    await db.connect()
    const distribution = await db.result.gradeDistribution()

    return distribution.map((g) => ({
        grade: g._id as string,
        count: g.count as number,
    }))
})
