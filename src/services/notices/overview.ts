import 'server-only'

import { connectDB } from '@/lib/db'
import { getAll } from './getAll'
import { statusCounts } from './statusCounts'

export async function overview() {
    await connectDB()
    const [notices, statusCountsData] = await Promise.all([
        getAll(),
        statusCounts(),
    ])

    return { notices, statusCounts: statusCountsData }
}
