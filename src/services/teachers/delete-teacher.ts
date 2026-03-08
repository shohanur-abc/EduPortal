"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { TeacherModel } from "@/models/teacher"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function deleteTeacher(id: string): Promise<ActionResult> {
    await connectDB()
    const teacher = await TeacherModel.findByIdAndDelete(id)
    if (!teacher) return error("Teacher not found")

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Teacher deleted successfully")
}
