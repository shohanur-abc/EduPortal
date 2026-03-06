import 'server-only'

import { cache } from 'react'
import { AttendanceModel } from '@/models/attendance'
import { connectDB } from '@/lib/db'

/**
 * #READ: Gets the list of students with the most absences from the database.
 * @param {number} limit - Maximum number of top absentees to retrieve (default: 10)
 * @returns {Promise<Array>} Array of students with most absences, each containing:
 *   - `studentName`: name of the student
 *   - `rollNumber`: student's roll number
 *   - `className`: class name with section (e.g., "10A")
 *   - `absences`: total count of absence records for the student
 */
export const topAbsentees = cache(async (limit: number = 10) => {
    await connectDB()
    const raw = await AttendanceModel.topAbsentees(limit)

    return raw.map((r) => ({
        studentName: r.studentName as string,
        rollNumber: r.rollNumber as string,
        className: r.className as string,
        absences: r.absences as number,
    }))
})
