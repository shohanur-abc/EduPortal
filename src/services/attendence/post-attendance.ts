"use server"

import { revalidatePath } from "next/cache"
import { Types } from "mongoose"
import { ActionResult } from "@/types/response"
import { auth } from "@/lib/auth"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"

export async function markBulkAttendance(raw: unknown): Promise<ActionResult> {
    const parsed = schemas.attendance.bulk.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    const session = await auth()
    if (!session?.user?.id) return error("Unauthorized")

    await db.connect()
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

    await db.attendance.bulkWrite(ops as Parameters<typeof db.attendance.bulkWrite>[0])

    revalidatePath(ROUTES.dashboard.attendance.root, "layout")
    return success(`Attendance marked for ${entries.length} students`)
}
