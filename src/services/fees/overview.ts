import 'server-only'

import { connectDB } from '@/lib/db'
import { getRecentPayments } from './getRecentPayments'
import { getOverdue } from './getOverdue'
import { statusBreakdown } from './statusBreakdown'

export async function overview(academicYear: string = "2025-2026") {
    await connectDB()
    const [statusBreakdownData, recentPayments, overdueList] = await Promise.all([
        statusBreakdown(academicYear),
        getRecentPayments(),
        getOverdue(),
    ])

    return { statusBreakdown: statusBreakdownData, recentPayments, overdueList }
}
