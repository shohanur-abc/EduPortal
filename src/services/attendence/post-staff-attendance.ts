"use server"

import { revalidatePath } from "next/cache"
import { Types } from "mongoose"
import { ActionResult } from "@/types/response"
import { auth } from "@/lib/auth"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"

export async function markBulkStaffAttendance(raw: unknown): Promise<ActionResult> {
    const parsed = schemas.attendance.staffBulk.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    const session = await auth()
    if (!session?.user?.id) return error("Unauthorized")
    if (session.user.role !== "principal" && session.user.role !== "admin") {
        return error("Only principal or admin can mark staff attendance")
    }

    await db.connect()

    const dateObj = new Date(parsed.data.date)
    dateObj.setHours(0, 0, 0, 0)

    const ops = parsed.data.entries.map((entry) => ({
        updateOne: {
            filter: {
                entityId: new Types.ObjectId(entry.memberId),
                entityModel: entry.memberType === "teacher" ? "Teacher" : "User",
                date: dateObj,
            },
            update: {
                $set: {
                    status: entry.status,
                    remarks: entry.remarks || "",
                    markedBy: new Types.ObjectId(session.user.id),
                },
            },
            upsert: true,
        },
    }))

    await db.staffAttendance.bulkWrite(ops as Parameters<typeof db.staffAttendance.bulkWrite>[0])
    revalidatePath(ROUTES.dashboard.attendance.root, "layout")

    return success(`Attendance marked for ${parsed.data.entries.length} staff members`)
}
