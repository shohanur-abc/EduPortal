"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function patchArchiveConversation(conversationId: string): Promise<ActionResult> {
    await db.connect()
    const conversation = await db.conversation.findByIdAndUpdate(conversationId, { isArchived: true }, { new: true })
    if (!conversation) return error("Conversation not found")
    revalidatePath(ROUTES.dashboard.messages.root, "layout")
    return success("Conversation archived")
}

export async function patchAddParticipant(conversationId: string, userId: string): Promise<ActionResult> {
    await db.connect()
    const conversation = await db.conversation.findByIdAndUpdate(
        conversationId,
        { $addToSet: { participants: { user: userId, role: "member" } } },
        { new: true }
    )
    if (!conversation) return error("Conversation not found")
    revalidatePath(ROUTES.dashboard.messages.root, "layout")
    return success("Participant added")
}

export async function patchRemoveParticipant(conversationId: string, userId: string): Promise<ActionResult> {
    await db.connect()
    const conversation = await db.conversation.findByIdAndUpdate(
        conversationId,
        { $pull: { participants: { user: userId } } },
        { new: true }
    )
    if (!conversation) return error("Conversation not found")
    revalidatePath(ROUTES.dashboard.messages.root, "layout")
    return success("Participant removed")
}
