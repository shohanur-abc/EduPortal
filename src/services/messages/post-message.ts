"use server"

import { revalidatePath } from "next/cache"
import { MessageModel } from "@/models/message"
import { ConversationModel } from "@/models/conversation"
import { connectDB, sid } from "@/lib/db"
import { messageSchema } from "@/schemas/dashboard"
import { success, error } from "@/lib/utils"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"


export async function postMessage(raw: unknown): Promise<ActionResult> {
    const parsed = messageSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    const { conversationId, senderId } = raw as { conversationId: string; senderId: string }
    if (!conversationId || !senderId) return error("Conversation ID and Sender ID are required")

    try {
        const message = await post({
            conversationId,
            senderId,
            content: parsed.data.content,
            type: parsed.data.type,
            replyTo: parsed.data.replyTo,
        })
        revalidatePath(ROUTES.dashboard.messages.root, "layout")
        return success("Message sent", { data: message })
    } catch (err) {
        return error((err as Error).message || "Failed to send message")
    }
}


async function post(data: {
    conversationId: string
    senderId: string
    content: string
    type?: "text" | "image" | "file" | "system"
    attachments?: { name: string; url: string; type: string; size?: number }[]
    replyTo?: string | null
}) {
    await connectDB()

    const conversation = await ConversationModel.findById(data.conversationId)
    if (!conversation) throw new Error("Conversation not found")

    const isParticipant = conversation.participants.some(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (p: any) => String(p.user) === data.senderId
    )
    if (!isParticipant) throw new Error("Not a participant in this conversation")

    const message = await MessageModel.create({
        conversation: data.conversationId,
        sender: data.senderId,
        content: data.content,
        type: data.type ?? "text",
        attachments: data.attachments ?? [],
        replyTo: data.replyTo ?? null,
        readBy: [{ user: data.senderId, readAt: new Date() }],
    })

    // Update conversation's lastMessage
    await ConversationModel.findByIdAndUpdate(data.conversationId, {
        lastMessage: message._id,
    })

    return {
        _id: sid(message),
        content: message.content,
        type: message.type,
        createdAt: message.createdAt?.toISOString() ?? "",
    }
}
