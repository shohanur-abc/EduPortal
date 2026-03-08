"use server"

import { Notice, Message } from "@/services"
import type { PaginatedNoticesResult } from "@/services/notices/get-paginated"
import type { PaginatedMessagesResult } from "@/services/messages/get-messages"

export async function fetchNoticesPaginated(
    page: number,
    pageSize: number = 12,
    filters?: { status?: string; priority?: string; search?: string },
): Promise<PaginatedNoticesResult> {
    return Notice.getPaginated(page, pageSize, filters)
}

export async function fetchConversations(userId: string) {
    return Message.getConversations(userId)
}

export async function fetchConversation(conversationId: string) {
    return Message.getConversation(conversationId)
}

export async function fetchMessages(conversationId: string, page: number = 1, limit: number = 50): Promise<PaginatedMessagesResult> {
    return Message.getMessages(conversationId, page, limit)
}

export async function fetchMessageOverview() {
    return Message.overview()
}

export async function fetchMessageAnalytics() {
    return Message.getAnalytics()
}

export async function fetchSearchConversations(userId: string, query: string) {
    return Message.searchConversations(userId, query)
}

export async function fetchSearchMessages(conversationId: string, query: string) {
    return Message.searchMessages(conversationId, query)
}
