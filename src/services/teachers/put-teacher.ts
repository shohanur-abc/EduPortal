"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function updateTeacher(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = schemas.teacher.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await db.connect()
    const teacher = await db.teacher.findByIdAndUpdate(id, parsed.data, { new: true })
    if (!teacher) return error("Teacher not found")

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Teacher updated successfully")
}
