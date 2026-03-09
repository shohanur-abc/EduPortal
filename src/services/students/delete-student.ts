"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function deleteStudent(id: string): Promise<ActionResult> {
    await db.connect()
    const student = await db.student.findByIdAndDelete(id)
    if (!student) return error("Student not found")

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Student deleted successfully")
}
