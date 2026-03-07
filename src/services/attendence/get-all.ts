import { connectDB, pop } from '@/lib/db'
import { fmtDate } from '@/lib/utils'
import { AttendanceModel } from '@/models/attendance'

/**
 * #READ: Retrieves all attendance records from the database with an optional limit.
 * @param {number} limit - Maximum number of records to retrieve (default: 200)
 * @returns {Promise<Array>} Array of attendance records, each containing:
 *   - `_id`: unique record identifier
 *   - `studentName`: name of the student (or "Unknown" if not found)
 *   - `rollNumber`: student's roll number
 *   - `className`: class name with section (e.g., "10A")
 *   - `date`: formatted date of the attendance record
 *   - `status`: attendance status (present, absent, late, excused)
 *   - `remarks`: optional remarks about the attendance record
 */
export const getAll = async (limit: number = 200) => {
    await connectDB()
    const records = await AttendanceModel.getAll(limit)

    return records.map((r) => ({
        _id: String(r._id),
        studentName: pop(r.student, "name") || "Unknown",
        rollNumber: pop(r.student, "rollNumber"),
        className: `${pop(r.classId, "name")} ${pop(r.classId, "section")}`.trim(),
        date: fmtDate(r.date),
        status: r.status,
        remarks: r.remarks ?? "",
    }))
}
