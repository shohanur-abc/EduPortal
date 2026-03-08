"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { AttendanceModel } from "@/models/attendance"
import { Types } from "mongoose"
import { bulkAttendanceSchema } from "@/features/dashboard/validators"
import { ActionResult } from "@/types/response"
import { auth } from "@/lib/auth"
import { ROUTES } from "@/lib/routes"

export async function markBulkAttendance(raw: unknown): Promise<ActionResult> {
    const parsed = bulkAttendanceSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    const session = await auth()
    if (!session?.user?.id) return error("Unauthorized")

    await connectDB()
    const { classId, date, entries } = parsed.data
    const dateObj = new Date(date)
    dateObj.setHours(0, 0, 0, 0)

    const ops = entries.map((entry) => ({
        updateOne: {
            filter: { student: new Types.ObjectId(entry.student), date: dateObj },
            update: {
                $set: {
                    classId: new Types.ObjectId(classId),
                    status: entry.status,
                    remarks: entry.remarks || "",
                    markedBy: new Types.ObjectId(session.user.id),
                },
            },
            upsert: true,
        },
    }))

    await AttendanceModel.bulkWrite(ops as Parameters<typeof AttendanceModel.bulkWrite>[0])

    revalidatePath(ROUTES.dashboard.attendance.root, "layout")
    return success(`Attendance marked for ${entries.length} students`)
}
