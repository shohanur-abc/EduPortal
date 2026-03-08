import { ConversationModel } from "@/models/conversation"
import { MessageModel } from "@/models/message"
import { connectDB, pop, sid } from "@/lib/db"


export async function getSearchConversations(
    userId: string,
    query: string
): Promise<SearchResult["conversations"]> {
    await connectDB()
    const results = await ConversationModel.searchConversations(userId, query)
    return results.map((c) => ({
        _id: sid(c),
        name: c.name || "Direct Message",
        type: c.type,
        participantCount: c.participants?.length ?? 0,
    }))
}

export async function getSearchMessages(
    conversationId: string,
    query: string
): Promise<SearchResult["messages"]> {
    await connectDB()
    const results = await MessageModel.searchMessages(conversationId, query)
    return results.map((m) => ({
        _id: sid(m),
        content: m.content,
        senderName: pop(m.sender, "name") || "Unknown",
        conversationId: String(m.conversation),
        createdAt: m.createdAt?.toISOString() ?? "",
    }))
}


export interface SearchResult {
    conversations: {
        _id: string
        name: string
        type: string
        participantCount: number
    }[]
    messages: {
        _id: string
        content: string
        senderName: string
        conversationId: string
        createdAt: string
    }[]
}
