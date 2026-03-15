"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { auth } from "@/lib/auth"
import { ActionResult } from "@/types/response"

export async function postOne(raw: unknown): Promise<ActionResult> {
    const parsed = schemas.notice.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    const session = await auth()
    if (!session?.user?.id) {
        return error("Unauthorized: You must be logged in to create a notice")
    }

    await db.connect()
    const notice = await db.notice.create({
        ...parsed.data,
        author: session.user.id,
        publishDate: parsed.data.publishDate ? new Date(parsed.data.publishDate) : new Date(),
        expiryDate: parsed.data.expiryDate ? new Date(parsed.data.expiryDate) : undefined,
    })

    revalidatePath(ROUTES.dashboard.notices.root, "layout")
    return success("Notice created successfully", { data: { _id: String(notice._id) } })
}
