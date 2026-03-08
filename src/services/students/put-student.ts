"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { StudentModel } from "@/models/student"
import { studentSchema } from "@/features/dashboard/validators"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function updateStudent(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = studentSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await connectDB()
    const student = await StudentModel.findByIdAndUpdate(id, parsed.data, { new: true })
    if (!student) return error("Student not found")

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Student updated successfully")
}
