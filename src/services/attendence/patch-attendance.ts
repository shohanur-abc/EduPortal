"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { AttendanceModel } from "@/models/attendance"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"
import { schemas } from "@/fatman"

export async function patchAttendance(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = schemas.attendance.correction.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await connectDB()
    const record = await AttendanceModel.findByIdAndUpdate(id, parsed.data, { new: true })
    if (!record) return error("Attendance record not found")

    revalidatePath(ROUTES.dashboard.attendance.root, "layout")
    return success("Attendance corrected successfully")
}
