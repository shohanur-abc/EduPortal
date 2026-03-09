"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function deleteTeacher(id: string): Promise<ActionResult> {
    await db.connect()
    const teacher = await db.teacher.findByIdAndDelete(id)
    if (!teacher) return error("Teacher not found")

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Teacher deleted successfully")
}
