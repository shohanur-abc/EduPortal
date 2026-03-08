"use server"

import {  Message } from "@/services"
import type { PaginatedMessagesResult } from "@/services/messages/get-messages"


export async function fetchConversations(userId: string) {
    return Message.getConversations(userId)
}


export async function fetchMessages(conversationId: string, page: number = 1, limit: number = 50): Promise<PaginatedMessagesResult> {
    return Message.getMessages(conversationId, page, limit)
}

export async function fetchMessageOverview() {
    return Message.getOverview()
}

export async function fetchMessageAnalytics() {
    return Message.getAnalytics()
}

export async function fetchSearchConversations(userId: string, query: string) {
    return Message.getSearchConversations(userId, query)
}

export async function fetchSearchMessages(conversationId: string, query: string) {
    return Message.getSearchMessages(conversationId, query)
}
