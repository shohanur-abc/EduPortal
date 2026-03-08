"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { ConversationModel } from "@/models/conversation"
import { success, error } from "@/lib/utils"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function patchArchiveConversation(conversationId: string): Promise<ActionResult> {
    await connectDB()
    const conversation = await ConversationModel.findByIdAndUpdate(conversationId, { isArchived: true }, { new: true })
    if (!conversation) return error("Conversation not found")
    revalidatePath(ROUTES.dashboard.messages.root, "layout")
    return success("Conversation archived")
}

export async function patchAddParticipant(conversationId: string, userId: string): Promise<ActionResult> {
    await connectDB()
    const conversation = await ConversationModel.findByIdAndUpdate(
        conversationId,
        { $addToSet: { participants: { user: userId, role: "member" } } },
        { new: true }
    )
    if (!conversation) return error("Conversation not found")
    revalidatePath(ROUTES.dashboard.messages.root, "layout")
    return success("Participant added")
}

export async function patchRemoveParticipant(conversationId: string, userId: string): Promise<ActionResult> {
    await connectDB()
    const conversation = await ConversationModel.findByIdAndUpdate(
        conversationId,
        { $pull: { participants: { user: userId } } },
        { new: true }
    )
    if (!conversation) return error("Conversation not found")
    revalidatePath(ROUTES.dashboard.messages.root, "layout")
    return success("Participant removed")
}
