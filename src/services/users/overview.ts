import 'server-only'

import { connectDB } from '@/lib/db'
import { getRecent } from './getRecent'
import { roleCounts } from './roleCounts'

export async function overview() {
    await connectDB()
    const [users, roleCountsData] = await Promise.all([
        getRecent(),
        roleCounts(),
    ])

    return { users, roleCounts: roleCountsData }
}
