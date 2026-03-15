"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function patchById(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = schemas.notice.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await db.connect()
    const notice = await db.notice.findByIdAndUpdate(
        id,
        {
            ...parsed.data,
            publishDate: parsed.data.publishDate ? new Date(parsed.data.publishDate) : undefined,
            expiryDate: parsed.data.expiryDate ? new Date(parsed.data.expiryDate) : undefined,
        },
        { new: true }
    )
    if (!notice) return error("Notice not found")

    revalidatePath(ROUTES.dashboard.notices.root, "layout")
    return success("Notice updated successfully")
}
