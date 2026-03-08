"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { ClassModel } from "@/models/class"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function deleteClass(id: string): Promise<ActionResult> {
    await connectDB()
    const cls = await ClassModel.findByIdAndDelete(id)
    if (!cls) return error("Class not found")

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Class deleted successfully")
}
