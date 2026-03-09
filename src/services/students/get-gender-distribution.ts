"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getGenderDistribution = cache(async () => {
    await db.connect()
    const raw = await db.student.genderDistribution()
    return raw.map((r) => ({
        gender: (r._id as string) || "unspecified",
        count: r.count as number,
    }))
})
