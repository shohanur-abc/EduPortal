"use server"

import { db } from '@/fatman'
import { getRecentPayments } from './get-recent-payments'
import { getOverdue } from './get-overdue'
import { statusBreakdown } from './get-status-breakdown'

export async function overview(academicYear: string = "2025-2026") {
    await db.connect()
    const [statusBreakdownData, recentPayments, overdueList] = await Promise.all([
        statusBreakdown(academicYear),
        getRecentPayments(),
        getOverdue(),
    ])

    return { statusBreakdown: statusBreakdownData, recentPayments, overdueList }
}
