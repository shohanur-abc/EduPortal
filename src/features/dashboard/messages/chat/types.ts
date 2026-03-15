import type { ConversationItem } from "@/services/messages/get-conversations"
import type { MessageItem } from "@/services/messages/get-messages"
import type { ConversationDetail } from "@/services/messages/get-conversation"

export type { ConversationItem, MessageItem, ConversationDetail }

export interface ChatUser {
    _id: string
    name: string
    image: string | null
    role: string
    email: string
}
