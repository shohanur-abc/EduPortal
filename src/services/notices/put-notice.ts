"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { NoticeModel } from "@/models/notice"
import { noticeSchema } from "@/schemas/dashboard"
import { success, error } from "@/lib/utils"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function patchById(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = noticeSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await connectDB()
    const notice = await NoticeModel.findByIdAndUpdate(
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
