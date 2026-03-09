"use server"

import { db } from "@/fatman"
import { fmtDate, pop, sid } from "@/fatman/utils"

export async function getConversations(userId: string): Promise<ConversationItem[]> {
    await db.connect()
    const conversations = await db.conversation.getByUser(userId)

    return conversations.map((c) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lastMsg: any = c.lastMessage
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const participants = c.participants.map((p: any) => ({
            _id: String(p.user?._id ?? p.user),
            name: p.user?.name ?? "Unknown",
            image: p.user?.image ?? null,
            role: p.user?.role ?? "user",
            email: p.user?.email ?? "",
            participantRole: p.role as "admin" | "member",
        }))

        // For direct conversations, use the other participant's name
        let displayName = c.name
        if (c.type === "direct" && !c.name) {
            const other = participants.find((p: { _id: string }) => p._id !== userId)
            displayName = other?.name ?? "Unknown"
        }

        // Count unread (messages since lastReadAt for this user)
        // Unread count would be computed via a separate aggregation in production
        const unreadCount = 0

        return {
            _id: sid(c),
            name: displayName || "Unnamed Conversation",
            type: c.type as "direct" | "group",
            description: c.description ?? "",
            avatar: c.avatar ?? null,
            participants,
            lastMessage: lastMsg
                ? {
                    content: lastMsg.content ?? "",
                    senderName: pop(lastMsg.sender, "name") || "Unknown",
                    senderId: String(lastMsg.sender?._id ?? lastMsg.sender ?? ""),
                    createdAt: fmtDate(lastMsg.createdAt),
                    type: lastMsg.type ?? "text",
                }
                : null,
            createdBy: String(c.createdBy?._id ?? c.createdBy ?? ""),
            createdByName: pop(c.createdBy, "name") || "Unknown",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            updatedAt: fmtDate((c as any).updatedAt),
            unreadCount,
            participantCount: participants.length,
        }
    })
}


// ============= TYPES =============

export interface ConversationItem {
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
    lastMessage: {
        content: string
        senderName: string
        senderId: string
        createdAt: string
        type: string
    } | null
    createdBy: string
    createdByName: string
    updatedAt: string
    unreadCount: number
    participantCount: number
}
