"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { auth } from "@/lib/auth"
import { NoticeModel } from "@/models/notice"
import { noticeSchema } from "@/schemas/dashboard"
import { success, error } from "@/lib/utils"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function postOne(raw: unknown): Promise<ActionResult> {
    const parsed = noticeSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    const session = await auth()
    if (!session?.user?.id) {
        return error("Unauthorized: You must be logged in to create a notice")
    }

    await connectDB()
    const notice = await NoticeModel.create({
        ...parsed.data,
        author: session.user.id,
        publishDate: parsed.data.publishDate ? new Date(parsed.data.publishDate) : new Date(),
        expiryDate: parsed.data.expiryDate ? new Date(parsed.data.expiryDate) : undefined,
    })

    revalidatePath(ROUTES.dashboard.notices.root, "layout")
    return success("Notice created successfully", { data: { _id: String(notice._id) } })
}
