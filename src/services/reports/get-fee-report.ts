"use server"

import { cache } from 'react'
import { FeeModel } from "@/models/fee"
import { connectDB } from '@/lib/db'

export const getFee = cache(async () => {
    await connectDB()
    const data = await FeeModel.aggregate([
        { $group: { _id: "$status", total: { $sum: "$amount" }, collected: { $sum: "$paidAmount" }, count: { $sum: 1 } } },
    ])

    return data.map((d) => ({
        status: d._id as string,
        total: d.total as number,
        collected: d.collected as number,
        count: d.count as number,
    }))
})
