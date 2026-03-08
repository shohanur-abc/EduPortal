import { ConversationModel } from "@/models/conversation"
import { connectDB, pop, sid } from "@/lib/db"


export async function getConversation(conversationId: string): Promise<ConversationDetail | null> {
    await connectDB()
    const c = await ConversationModel.getById(conversationId)
    if (!c) return null

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const participants = c.participants.map((p: any) => ({
        _id: String(p.user?._id ?? p.user),
        name: p.user?.name ?? "Unknown",
        image: p.user?.image ?? null,
        role: p.user?.role ?? "user",
        email: p.user?.email ?? "",
        participantRole: p.role as "admin" | "member",
    }))

    return {
        _id: sid(c),
        name: c.name || "Unnamed Conversation",
        type: c.type as "direct" | "group",
        description: c.description ?? "",
        avatar: c.avatar ?? null,
        participants,
        createdBy: {
            _id: String(c.createdBy?._id ?? c.createdBy ?? ""),
            name: pop(c.createdBy, "name") || "Unknown",
            image: pop(c.createdBy, "image") || null,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pinnedMessages: (c.pinnedMessages ?? []).map((m: any) => ({
            _id: String(m._id),
            content: m.content ?? "",
            senderName: pop(m.sender, "name") || "Unknown",
        })),
        participantCount: participants.length,
    }
}


export interface ConversationDetail {
    _id: string
    name: string
    type: "direct" | "group"
    description: string
    avatar: string | null
    participants: {
        _id: string
        name: string
        image: string | null
        role: string
        email: string
        participantRole: "admin" | "member"
    }[]
    createdBy: { _id: string; name: string; image: string | null }
    pinnedMessages: {
        _id: string
        content: string
        senderName: string
    }[]
    participantCount: number
}
