import { MessageModel } from "@/models/message"
import { connectDB, pop, sid } from "@/lib/db"

export async function getMessages(
    conversationId: string,
    page: number = 1,
    limit: number = 50
): Promise<PaginatedMessagesResult> {
    await connectDB()
    const [messages, total] = await Promise.all([
        MessageModel.getByConversation(conversationId, page, limit),
        MessageModel.countByConversation(conversationId),
    ])

    const items: MessageItem[] = messages.map((m) => ({
        _id: sid(m),
        content: m.content,
        type: m.type as MessageItem["type"],
        sender: {
            _id: String(m.sender?._id ?? m.sender ?? ""),
            name: pop(m.sender, "name") || "Unknown",
            image: pop(m.sender, "image") || null,
            role: pop(m.sender, "role") || "user",
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        attachments: (m.attachments ?? []).map((a: any) => ({
            name: a.name,
            url: a.url,
            type: a.type,
            size: a.size,
        })),
        replyTo: m.replyTo
            ? {
                _id: String(m.replyTo._id),
                content: pop(m.replyTo, "content") || "",
                senderName: pop(pop(m.replyTo, "sender"), "name") || "Unknown",
            }
            : null,
        isEdited: m.isEdited ?? false,
        createdAt: m.createdAt?.toISOString() ?? "",
        updatedAt: m.updatedAt?.toISOString() ?? "",
    }))

    return {
        items: items.reverse(), // oldest first for display
        total,
        hasMore: page * limit < total,
        page,
    }
}



export interface MessageItem {
    _id: string
    content: string
    type: "text" | "image" | "file" | "system"
    sender: {
        _id: string
        name: string
        image: string | null
        role: string
    }
    attachments: {
        name: string
        url: string
        type: string
        size?: number
    }[]
    replyTo: {
        _id: string
        content: string
        senderName: string
    } | null
    isEdited: boolean
    createdAt: string
    updatedAt: string
}

export interface PaginatedMessagesResult {
    items: MessageItem[]
    total: number
    hasMore: boolean
    page: number
}
