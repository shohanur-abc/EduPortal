"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { AttendanceModel } from "@/models/attendance"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function deleteAttendance(id: string): Promise<ActionResult> {
    await connectDB()
    const record = await AttendanceModel.findByIdAndDelete(id)
    if (!record) return error("Attendance record not found")

    revalidatePath(ROUTES.dashboard.attendance.root, "layout")
    return success("Attendance record deleted")
}
