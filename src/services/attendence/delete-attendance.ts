"use server"

import { revalidatePath } from "next/cache"
import { ActionResult } from "@/types/response"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"

export async function deleteAttendance(id: string): Promise<ActionResult> {
    await db.connect()
    const record = await db.attendance.findByIdAndDelete(id)
    if (!record) return error("Attendance record not found")

    revalidatePath(ROUTES.dashboard.attendance.root, "layout")
    return success("Attendance record deleted")
}

