"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { MessageModel } from "@/models/message"
import { success, error } from "@/lib/utils"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function patchRemoveMessage(messageId: string): Promise<ActionResult> {
    await connectDB()
    const message = await MessageModel.findByIdAndUpdate(
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
    await connectDB()
    const message = await MessageModel.findByIdAndUpdate(messageId, { content, isEdited: true }, { new: true })
    if (!message) return error("Message not found")
    revalidatePath(ROUTES.dashboard.messages.root, "layout")
    return success("Message edited")
}
