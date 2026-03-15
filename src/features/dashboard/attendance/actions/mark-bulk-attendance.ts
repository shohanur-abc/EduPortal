"use server"

import { AttendanceModel } from "@/models/attendance"
import { ClassModel } from "@/models/class"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { auth } from "@/lib/auth"

interface AttendanceEntry {
    student: string
    status: "present" | "absent" | "late" | "excused"
}

export async function markBulkAttendance({
    classId,
    date,
    entries,
}: {
    classId: string
    date: string
    entries: AttendanceEntry[]
}) {
    try {
        await connectDB()
        const session = await auth()

        if (!session?.user?.id) {
            return error("Unauthorized")
        }

        // Verify user has permission to mark attendance for this class
        const cls = await ClassModel.findById(classId)
        if (!cls) {
            return error("Class not found")
        }

        const dateObj = new Date(date)
        dateObj.setUTCHours(0, 0, 0, 0)

        // Delete existing attendance records for this class and date
        await AttendanceModel.deleteMany({
            classId,
            date: {
                $gte: dateObj,
                $lt: new Date(dateObj.getTime() + 24 * 60 * 60 * 1000),
            },
        })

        // Insert new attendance records
        const records = entries.map((entry) => ({
            student: entry.student,
            classId,
            date: dateObj,
            status: entry.status,
            markedBy: session.user.id,
        }))

        await AttendanceModel.insertMany(records)

        return success(`Attendance marked for ${entries.length} students`)
    } catch (err) {
        console.error("Failed to mark attendance:", err)
        return error("Failed to mark attendance")
    }
}
