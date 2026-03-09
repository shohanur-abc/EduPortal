"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getReport = cache(async (limit: number = 100) => {
    await db.connect()
    const data = await db.attendance.reportByDateStatus(limit)

    return data.map((d) => ({
        date: d._id.date as string,
        status: d._id.status as string,
        count: d.count as number,
    }))
})
