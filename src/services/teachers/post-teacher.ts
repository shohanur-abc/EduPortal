"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function createTeacher(raw: unknown): Promise<ActionResult> {
    const parsed = schemas.teacher.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await db.connect()
    const teacher = await db.teacher.create(parsed.data)

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Teacher created successfully", { data: { _id: String(teacher._id) } })
}
