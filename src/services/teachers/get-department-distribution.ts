"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getDepartmentDistribution = cache(async () => {
    await db.connect()
    const raw = await db.teacher.departmentDistribution()
    return raw.map((r) => ({
        department: r._id as string,
        count: r.count as number,
    }))
})
