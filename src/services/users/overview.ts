import { connectDB } from '@/lib/db'
import { getRecent } from './get-recent'
import { roleCounts } from './role-counts'

export async function overview() {
    await connectDB()
    const [users, roleCountsData] = await Promise.all([
        getRecent(),
        roleCounts(),
    ])

    return { users, roleCounts: roleCountsData }
}
