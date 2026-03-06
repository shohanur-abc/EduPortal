import 'server-only'

import { cache } from 'react'
import { AttendanceModel } from '@/models/attendance'
import { connectDB } from '@/lib/db'

/**
 * #READ: Gets the overall attendance rate statistics from the database.
 * @param {}
 * @returns
 * The returned object contains:
 * - `rate`: overall attendance rate as a percentage (rounded to 1 decimal)
 * - `total`: total number of attendance records
 * - `present`: total number of students marked as present
 */
export const attendanceRate = cache(async () => {
    await connectDB()
    const raw = await AttendanceModel.attendanceRate()
    const data = raw[0]
    return {
        rate: data ? Math.round(data.rate * 10) / 10 : 0,
        total: data?.total ?? 0,
        present: data?.present ?? 0,
    }
})
