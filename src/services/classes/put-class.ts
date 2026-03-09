"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function updateClass(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = schemas.class.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await db.connect()
    const cls = await db.class.findByIdAndUpdate(id, parsed.data, { new: true })
    if (!cls) return error("Class not found")

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Class updated successfully")
}
