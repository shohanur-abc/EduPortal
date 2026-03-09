"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function createClass(raw: unknown): Promise<ActionResult> {
    const parsed = schemas.class.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await db.connect()
    const cls = await db.class.create(parsed.data)

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Class created successfully", { data: { _id: String(cls._id) } })
}
