"use server"

import { ConversationModel } from "@/models/conversation"
import { MessageModel } from "@/models/message"
import { connectDB } from "@/lib/db"


export async function getOverview(): Promise<MessageOverviewData> {
    await connectDB()

    const [
        totalConversations,
        totalMessages,
        conversationTypes,
        messageTypes,
    ] = await Promise.all([
        ConversationModel.countDocuments({ isArchived: false }),
        MessageModel.countDocuments({ isDeleted: false }),
        ConversationModel.typeCounts(),
        MessageModel.typeCounts(),
    ])

    const directChats = conversationTypes.find((c: { _id: string }) => c._id === "direct")?.count ?? 0
    const activeGroups = conversationTypes.find((c: { _id: string }) => c._id === "group")?.count ?? 0

    return {
        totalConversations,
        totalMessages,
        activeGroups,
        directChats,
        conversationTypes: conversationTypes.map((c: { _id: string; count: number }) => ({
            type: c._id,
            count: c.count,
        })),
        messageTypes: messageTypes.map((m: { _id: string; count: number }) => ({
            type: m._id,
            count: m.count,
        })),
    }
}


export interface MessageOverviewData {
    totalConversations: number
    totalMessages: number
    activeGroups: number
    directChats: number
    conversationTypes: { type: string; count: number }[]
    messageTypes: { type: string; count: number }[]
}
