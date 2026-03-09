"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function updateResult(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = schemas.result.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await db.connect()
    // Use save() to trigger pre-save middleware (grade calculation)
    const result = await db.result.findById(id)
    if (!result) return error("Result not found")

    Object.assign(result, parsed.data)
    await result.save()

    revalidatePath(ROUTES.dashboard.results.root, "layout")
    return success("Result updated successfully")
}
