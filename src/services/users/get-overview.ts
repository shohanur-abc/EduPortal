"use server"

import { db } from '@/fatman'
import { getRecent } from './get-recent'
import { getRoleCounts } from './get-role-counts'

export async function getOverview() {
    await db.connect()
    const [users, roleCountsData] = await Promise.all([
        getRecent(),
        getRoleCounts(),
    ])

    return { users, roleCounts: roleCountsData }
}
