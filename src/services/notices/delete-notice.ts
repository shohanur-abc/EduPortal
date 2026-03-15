"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function deleteById(id: string): Promise<ActionResult> {
    await db.connect()
    const notice = await db.notice.findByIdAndDelete(id)
    if (!notice) return error("Notice not found")

    revalidatePath(ROUTES.dashboard.notices.root, "layout")
    return success("Notice deleted successfully")
}
