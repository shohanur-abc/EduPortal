import { MessageModel } from "@/models/message"
import { ConversationModel } from "@/models/conversation"
import { connectDB, sid } from "@/lib/db"

export async function postMessage(data: {
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
