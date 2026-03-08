"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { NoticeModel } from "@/models/notice"
import { success, error } from "@/lib/utils"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function deleteById(id: string): Promise<ActionResult> {
    await connectDB()
    const notice = await NoticeModel.findByIdAndDelete(id)
    if (!notice) return error("Notice not found")

    revalidatePath(ROUTES.dashboard.notices.root, "layout")
    return success("Notice deleted successfully")
}
