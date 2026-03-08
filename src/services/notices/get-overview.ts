import { connectDB } from '@/lib/db'
import { getAll } from './get-all'
import { statusCounts } from './get-status-counts'

export async function overview() {
    await connectDB()
    const [notices, statusCountsData] = await Promise.all([
        getAll(),
        statusCounts(),
    ])

    return { notices, statusCounts: statusCountsData }
}
