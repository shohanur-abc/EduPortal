"use server"

import { cache } from 'react'
import { db } from '@/fatman'

/**
 * #READ: Gets the attendance statistics for today from the database.
 *
 * The returned object contains:
 * - `present`: count of students marked as present today
 * - `absent`: count of students marked as absent today
 * - `late`: count of students marked as late today
 * - `excused`: count of students with excused absences today
 * - `total`: total number of attendance records for today
 * - `rate`: today's attendance rate as a percentage (rounded to 1 decimal)
 */
export const getTodayStats = cache(async () => {
    await db.connect()

    const raw = await db.attendance.getTodayStats()
    const present = raw.find((r: { _id: string }) => r._id === "present")?.count ?? 0
    const absent = raw.find((r: { _id: string }) => r._id === "absent")?.count ?? 0
    const late = raw.find((r: { _id: string }) => r._id === "late")?.count ?? 0
    const excused = raw.find((r: { _id: string }) => r._id === "excused")?.count ?? 0
    const total = present + absent + late + excused
    const rate = total > 0 ? Math.round((present / total) * 100 * 10) / 10 : 0

    return { present, absent, late, excused, total, rate }
})
