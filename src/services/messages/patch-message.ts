"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function patchRemoveMessage(messageId: string): Promise<ActionResult> {
    await db.connect()
    const message = await db.message.findByIdAndUpdate(
        messageId,
        { isDeleted: true, content: "This message was deleted" },
        { new: true }
    )
    if (!message) return error("Message not found")
    revalidatePath(ROUTES.dashboard.messages.root, "layout")
    return success("Message deleted")
}

export async function patchMessage(messageId: string, content: string): Promise<ActionResult> {
    if (!content.trim()) return error("Message content cannot be empty")
    await db.connect()
    const message = await db.message.findByIdAndUpdate(messageId, { content, isEdited: true }, { new: true })
    if (!message) return error("Message not found")
    revalidatePath(ROUTES.dashboard.messages.root, "layout")
    return success("Message edited")
}
