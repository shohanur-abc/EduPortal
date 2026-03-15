"use server"

import { revalidatePath } from "next/cache"
import { ActionResult } from "@/types/response"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"

export async function patchAttendance(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = schemas.attendance.correction.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await db.connect()
    const record = await db.attendance.findByIdAndUpdate(id, parsed.data, { new: true })
    if (!record) return error("Attendance record not found")

    revalidatePath(ROUTES.dashboard.attendance.root, "layout")
    return success("Attendance corrected successfully")
}
