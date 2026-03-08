"use server"

import { connectDB } from '@/lib/db'
import { getAll } from './get-all'
import { getStatusCounts } from './get-status-counts'

export async function getOverview() {
    await connectDB()
    const [notices, statusCountsData] = await Promise.all([
        getAll(),
        getStatusCounts(),
    ])

    return { notices, statusCounts: statusCountsData }
}
