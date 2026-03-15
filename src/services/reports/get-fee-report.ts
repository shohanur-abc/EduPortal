"use server"

import { cache } from 'react'
import { db } from '@/fatman'

export const getFee = cache(async () => {
    await db.connect()
    const data = await db.fee.aggregate([
        { $group: { _id: "$status", total: { $sum: "$amount" }, collected: { $sum: "$paidAmount" }, count: { $sum: 1 } } },
    ])

    return data.map((d) => ({
        status: d._id as string,
        total: d.total as number,
        collected: d.collected as number,
        count: d.count as number,
    }))
})
