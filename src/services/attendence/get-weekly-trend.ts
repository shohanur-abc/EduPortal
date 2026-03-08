"use server"

import { cache } from 'react'
import { AttendanceModel } from '@/models/attendance'
import { connectDB } from '@/lib/db'

/**
 * #READ: Gets the weekly attendance trend over a specified number of weeks.
 * @param {number} weeks - Number of weeks to include in the trend (default: 8)
 * @returns {Promise<Array>} Array of weekly summaries sorted chronologically, each containing:
 *   - `week`: ISO week number (1-53)
 *   - `year`: calendar year of the week
 *   - `present`: count of students marked as present that week
 *   - `absent`: count of students marked as absent that week
 *   - `late`: count of students marked as late that week
 *   - `excused`: count of students with excused absences that week
 */
export const getWeeklyTrend = cache(async (weeks: number = 8) => {
    await connectDB()
    const raw = await AttendanceModel.weeklyTrend(weeks)
    const weekMap = new Map<string, { week: number; year: number; present: number; absent: number; late: number; excused: number }>()

    for (const r of raw) {
        const key = `${r._id.year}-W${r._id.week}`
        if (!weekMap.has(key)) weekMap.set(key, { week: r._id.week, year: r._id.year, present: 0, absent: 0, late: 0, excused: 0 })
        const entry = weekMap.get(key)!
        entry[r._id.status as "present" | "absent" | "late" | "excused"] = r.count
    }

    return Array.from(weekMap.values()).sort((a, b) => a.year - b.year || a.week - b.week)
})
