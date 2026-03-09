"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { StudentModel } from "@/models/student"
import { studentSchema } from "@/schemas/dashboard"
import { success, error } from "@/lib/utils"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function createStudent(raw: unknown): Promise<ActionResult> {
    const parsed = studentSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await connectDB()
    const student = await StudentModel.create(parsed.data)

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Student created successfully", { data: { _id: String(student._id) } })
}
