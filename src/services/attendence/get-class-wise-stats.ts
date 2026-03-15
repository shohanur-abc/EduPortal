"use server"

import { cache } from 'react'
import { db } from '@/fatman'

/**
 * #READ: Gets the attendance statistics for each class and section from the database.
 *
 * Each returned object contains:
 * - `className`: concatenation of class name and section (e.g., "10A")
 * - `total`: total number of students in the class (e.g., 30)
 * - `present`: number of students present (e.g., 25)
 * - `absent`: number of students absent (e.g., 5)
 * - `late`: number of students late (e.g., 2)
 * - `excused`: number of students excused (e.g., 1)
 * - `rate`: attendance rate as a percentage (rounded to 1 decimal)
 */
export const getClassWiseStats = cache(async () => {
    await db.connect()
    const raw = await db.attendance.getClassWiseStats()

    return raw.map((r) => ({
        className: `${r._id.className} ${r._id.section}`,
        total: r.total as number,
        present: r.present as number,
        absent: r.absent as number,
        late: r.late as number,
        excused: r.excused as number,
        rate: r.total > 0 ? Math.round((r.present / r.total) * 100 * 10) / 10 : 0,
    }))
})