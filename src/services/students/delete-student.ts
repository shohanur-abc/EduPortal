"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { StudentModel } from "@/models/student"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function deleteStudent(id: string): Promise<ActionResult> {
    await connectDB()
    const student = await StudentModel.findByIdAndDelete(id)
    if (!student) return error("Student not found")

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Student deleted successfully")
}
