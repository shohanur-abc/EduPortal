"use server"

import { db } from '@/fatman'
import { getAll } from './get-all'
import { getStatusCounts } from './get-status-counts'

export async function getOverview() {
    await db.connect()
    const [notices, statusCountsData] = await Promise.all([
        getAll(),
        getStatusCounts(),
    ])

    return { notices, statusCounts: statusCountsData }
}
