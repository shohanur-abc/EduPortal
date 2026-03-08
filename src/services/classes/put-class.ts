"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { ClassModel } from "@/models/class"
import { classSchema } from "@/features/dashboard/validators"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function updateClass(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = classSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await connectDB()
    const cls = await ClassModel.findByIdAndUpdate(id, parsed.data, { new: true })
    if (!cls) return error("Class not found")

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Class updated successfully")
}
