"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { NoticeModel } from "@/models/notice"
import { success, error } from "@/lib/utils"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function patchMarkAsPublished(id: string): Promise<ActionResult> {
    await connectDB()
    const notice = await NoticeModel.findByIdAndUpdate(
        id,
        { status: "published", publishDate: new Date() },
        { new: true }
    )
    if (!notice) return error("Notice not found")

    revalidatePath(ROUTES.dashboard.notices.root, "layout")
    return success("Notice published successfully")
}

export async function patchMarkAsArchived(id: string): Promise<ActionResult> {
    await connectDB()
    const notice = await NoticeModel.findByIdAndUpdate(id, { status: "archived" }, { new: true })
    if (!notice) return error("Notice not found")

    revalidatePath(ROUTES.dashboard.notices.root, "layout")
    return success("Notice archived successfully")
}
