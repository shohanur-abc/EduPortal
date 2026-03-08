import { connectDB } from '@/lib/db'
import { getRecent } from './get-recent'
import { getRoleCounts } from './get-role-counts'

export async function getOverview() {
    await connectDB()
    const [users, roleCountsData] = await Promise.all([
        getRecent(),
        getRoleCounts(),
    ])

    return { users, roleCounts: roleCountsData }
}
