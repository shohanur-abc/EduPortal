"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { TeacherModel } from "@/models/teacher"
import { teacherSchema } from "@/schemas/dashboard"
import { success, error } from "@/lib/utils"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function updateTeacher(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = teacherSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await connectDB()
    const teacher = await TeacherModel.findByIdAndUpdate(id, parsed.data, { new: true })
    if (!teacher) return error("Teacher not found")

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Teacher updated successfully")
}
