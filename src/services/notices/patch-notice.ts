"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function patchMarkAsPublished(id: string): Promise<ActionResult> {
    await db.connect()
    const notice = await db.notice.findByIdAndUpdate(
        id,
        { status: "published", publishDate: new Date() },
        { new: true }
    )
    if (!notice) return error("Notice not found")

    revalidatePath(ROUTES.dashboard.notices.root, "layout")
    return success("Notice published successfully")
}

export async function patchMarkAsArchived(id: string): Promise<ActionResult> {
    await db.connect()
    const notice = await db.notice.findByIdAndUpdate(id, { status: "archived" }, { new: true })
    if (!notice) return error("Notice not found")

    revalidatePath(ROUTES.dashboard.notices.root, "layout")
    return success("Notice archived successfully")
}
