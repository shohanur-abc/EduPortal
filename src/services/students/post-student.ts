"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function createStudent(raw: unknown): Promise<ActionResult> {
    const parsed = schemas.student.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await db.connect()
    const student = await db.student.create(parsed.data)

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Student created successfully", { data: { _id: String(student._id) } })
}
