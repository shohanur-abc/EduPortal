"use server"

import { cache } from 'react'
import { db } from '@/fatman'

/**
 * #READ: Gets the monthly attendance summary over a specified number of months.
 * @param {number} months - Number of months to include in the summary (default: 6)
 * @returns {Promise<Array>} Array of monthly summaries in chronological order, each containing:
 *   - **month** : formatted month label (e.g., "Jan 2026")
 *   - `present`: count of students marked as present that month
 *   - `absent`: count of students marked as absent that month
 *   - `late`: count of students marked as late that month
 *   - `excused`: count of students with excused absences that month
 */
export const getMonthlySummary = cache(async (months: number = 6) => {
    await db.connect()
    const raw = await db.attendance.getMonthlySummary(months)
    const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthMap = new Map<string, { month: string; present: number; absent: number; late: number; excused: number }>()

    for (const r of raw) {
        const key = `${r._id.year}-${r._id.month}`
        const label = `${MONTH_NAMES[r._id.month]} ${r._id.year}`
        if (!monthMap.has(key)) monthMap.set(key, { month: label, present: 0, absent: 0, late: 0, excused: 0 })
        const entry = monthMap.get(key)!
        entry[r._id.status as "present" | "absent" | "late" | "excused"] = r.count
    }

    return Array.from(monthMap.values())
})
