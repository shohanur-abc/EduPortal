"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { TeacherModel } from "@/models/teacher"
import { teacherSchema } from "@/schemas/dashboard"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function createTeacher(raw: unknown): Promise<ActionResult> {
    const parsed = teacherSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await connectDB()
    const teacher = await TeacherModel.create(parsed.data)

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Teacher created successfully", { data: { _id: String(teacher._id) } })
}
