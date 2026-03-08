"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ChatBubble } from "@/features/dashboard/messages/chat/components/chat-bubble"
import { MessageInput } from "@/features/dashboard/messages/chat/components/message-input"
import { GroupInfoPanel } from "@/features/dashboard/messages/chat/components/group-info-panel"
import { ConversationList, type ConversationListItem } from "@/features/dashboard/messages/chat/components/conversation-list"
import { NewConversationDialog } from "./new-conversation-dialog"
import { EmptyState } from "@/components/molecules/empty-state"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { postMessage, patchRemoveMessage, patchMessage, patchArchiveConversation, } from "@/services/messages"
import { fetchConversations, fetchMessages, fetchSearchConversations, } from "@/features/dashboard/actions/queries"
import { MessageSquare, Video, Phone, Search, MoreVertical, Reply, Pencil, Trash2, Archive, Info, } from "lucide-react"
import { toast } from "sonner"
import type { ConversationItem, ConversationDetail, MessageItem, ChatUser } from "./types"
import { Message } from "@/services"

// ============= MAIN CHAT ROOM COMPONENT =============
export function ChatRoom({
    currentUserId,
    initialConversations,
    allUsers,
}: {
    currentUserId: string
    initialConversations: ConversationItem[]
    allUsers: ChatUser[]
}) {
    // State
    const [conversations, setConversations] = React.useState<ConversationItem[]>(initialConversations)
    const [activeConversationId, setActiveConversationId] = React.useState<string | null>(null)
    const [conversationDetail, setConversationDetail] = React.useState<ConversationDetail | null>(null)
    const [messages, setMessages] = React.useState<MessageItem[]>([])
    const [isLoadingMessages, setIsLoadingMessages] = React.useState(false)
    const [, setIsLoadingConversation] = React.useState(false)
    const [showInfo, setShowInfo] = React.useState(false)
    const [replyTo, setReplyTo] = React.useState<{ _id: string; senderName: string; content: string } | null>(null)
    const [messagePage, setMessagePage] = React.useState(1)
    const [hasMoreMessages, setHasMoreMessages] = React.useState(false)

    const messagesEndRef = React.useRef<HTMLDivElement>(null)
    const scrollAreaRef = React.useRef<HTMLDivElement>(null)

    // Scroll to bottom
    const scrollToBottom = React.useCallback(() => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
    }, [])

    // Select conversation
    const handleSelectConversation = React.useCallback(async (conversationId: string) => {
        setActiveConversationId(conversationId)
        setIsLoadingMessages(true)
        setIsLoadingConversation(true)
        setMessages([])
        setReplyTo(null)
        setMessagePage(1)

        try {
            const [detail, msgResult] = await Promise.all([
                Message.getConversation(conversationId),
                fetchMessages(conversationId, 1, 50),
            ])
            setConversationDetail(detail)
            setMessages(msgResult.items)
            setHasMoreMessages(msgResult.hasMore)
            scrollToBottom()
        } catch {
            toast.error("Failed to load conversation")
        } finally {
            setIsLoadingMessages(false)
            setIsLoadingConversation(false)
        }
    }, [scrollToBottom])

    // Send message
    const handleSendMessage = React.useCallback(async (content: string) => {
        if (!activeConversationId) return

        // Optimistic update
        const tempMessage: MessageItem = {
            _id: `temp-${Date.now()}`,
            content,
            type: "text",
            sender: {
                _id: currentUserId,
                name: allUsers.find((u) => u._id === currentUserId)?.name ?? "You",
                image: allUsers.find((u) => u._id === currentUserId)?.image ?? null,
                role: allUsers.find((u) => u._id === currentUserId)?.role ?? "user",
            },
            attachments: [],
            replyTo: replyTo ? { _id: replyTo._id, content: replyTo.content, senderName: replyTo.senderName } : null,
            isEdited: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, tempMessage])
        setReplyTo(null)
        scrollToBottom()

        try {
            const result = await postMessage({
                conversationId: activeConversationId,
                senderId: currentUserId,
                content,
                type: "text",
                replyTo: replyTo?._id ?? null,
            })
            if (!result.success) {
                toast.error(result.error)
                setMessages((prev) => prev.filter((m) => m._id !== tempMessage._id))
            } else {
                // Refresh conversations list for updated lastMessage
                const refreshed = await fetchConversations(currentUserId)
                setConversations(refreshed)
            }
        } catch {
            toast.error("Failed to send message")
            setMessages((prev) => prev.filter((m) => m._id !== tempMessage._id))
        }
    }, [activeConversationId, currentUserId, replyTo, scrollToBottom, allUsers])

    // Delete message
    const handleDeleteMessage = React.useCallback(async (messageId: string) => {
        try {
            const result = await patchRemoveMessage(messageId)
            if (result.success) {
                setMessages((prev) => prev.filter((m) => m._id !== messageId))
                toast.success("Message deleted")
            } else {
                toast.error(result.error)
            }
        } catch {
            toast.error("Failed to delete message")
        }
    }, [])

    // Edit message
    const handleEditMessage = React.useCallback(async (messageId: string, newContent: string) => {
        try {
            const result = await patchMessage(messageId, newContent)
            if (result.success) {
                setMessages((prev) =>
                    prev.map((m) => (m._id === messageId ? { ...m, content: newContent, isEdited: true } : m))
                )
                toast.success("Message edited")
            } else {
                toast.error(result.error)
            }
        } catch {
            toast.error("Failed to edit message")
        }
    }, [])

    // Archive conversation
    const handleArchiveConversation = React.useCallback(async () => {
        if (!activeConversationId) return
        try {
            const result = await patchArchiveConversation(activeConversationId)
            if (result.success) {
                setConversations((prev) => prev.filter((c) => c._id !== activeConversationId))
                setActiveConversationId(null)
                setConversationDetail(null)
                setMessages([])
                toast.success("Conversation archived")
            } else {
                toast.error(result.error)
            }
        } catch {
            toast.error("Failed to archive conversation")
        }
    }, [activeConversationId])

    // Load more messages
    const handleLoadMore = React.useCallback(async () => {
        if (!activeConversationId || !hasMoreMessages || isLoadingMessages) return
        setIsLoadingMessages(true)
        try {
            const nextPage = messagePage + 1
            const result = await fetchMessages(activeConversationId, nextPage, 50)
            setMessages((prev) => [...result.items, ...prev])
            setMessagePage(nextPage)
            setHasMoreMessages(result.hasMore)
        } catch {
            toast.error("Failed to load messages")
        } finally {
            setIsLoadingMessages(false)
        }
    }, [activeConversationId, hasMoreMessages, isLoadingMessages, messagePage])

    // Search conversations
    const handleSearchConversations = React.useCallback(async (query: string) => {
        if (!query.trim()) {
            const refreshed = await fetchConversations(currentUserId)
            setConversations(refreshed)
            return
        }
        try {
            const results = await fetchSearchConversations(currentUserId, query)
            // Match results to conversations
            const matchedIds = new Set(results.map((r) => r._id))
            setConversations(conversations.filter((c) => matchedIds.has(c._id)))
        } catch {
            toast.error("Search failed")
        }
    }, [currentUserId, conversations])

    // On new conversation created
    const handleConversationCreated = React.useCallback(async (conversationId: string) => {
        const refreshed = await fetchConversations(currentUserId)
        setConversations(refreshed)
        handleSelectConversation(conversationId)
    }, [currentUserId, handleSelectConversation])

    // Map conversations for list
    const conversationListItems: ConversationListItem[] = React.useMemo(
        () =>
            conversations.map((c) => ({
                _id: c._id,
                name: c.name,
                avatar: c.avatar,
                lastMessage: c.lastMessage?.content,
                lastMessageTime: c.lastMessage?.createdAt ? formatTime(c.lastMessage.createdAt) : undefined,
                unreadCount: c.unreadCount,
                type: c.type,
            })),
        [conversations]
    )

    // Active conversation header
    const activeConversation = conversations.find((c) => c._id === activeConversationId)

    return (
        <div className="flex h-[calc(100vh-6rem)] rounded-lg border bg-background overflow-hidden">
            {/* Sidebar: Conversation List */}
            <div className="w-80 shrink-0 border-r flex flex-col">
                <ConversationList
                    conversations={conversationListItems}
                    activeId={activeConversationId ?? undefined}
                    onSelect={handleSelectConversation}
                    onSearch={handleSearchConversations}
                    header={
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-sm">Messages</h2>
                            <NewConversationDialog
                                currentUserId={currentUserId}
                                users={allUsers}
                                onCreated={handleConversationCreated}
                            />
                        </div>
                    }
                />
            </div>

            {/* Middle: Chat Area */}
            <div className="flex flex-1 flex-col min-w-0">
                {activeConversationId && activeConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="flex items-center justify-between border-b px-4 py-3">
                            <div className="flex items-center gap-3 min-w-0">
                                <div>
                                    <h3 className="text-sm font-semibold truncate">{activeConversation.name}</h3>
                                    <p className="text-xs text-muted-foreground">
                                        {activeConversation.type === "group"
                                            ? `${activeConversation.participantCount} members`
                                            : "Click here to see contact info"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="size-8">
                                    <Video />
                                </Button>
                                <Button variant="ghost" size="icon" className="size-8">
                                    <Phone />
                                </Button>
                                <Button variant="ghost" size="icon" className="size-8">
                                    <Search />
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreVertical />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setShowInfo(!showInfo)}>
                                            <Info className="size-4 mr-2" />
                                            {showInfo ? "Hide Info" : "Show Info"}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleArchiveConversation} className="text-destructive">
                                            <Archive className="size-4 mr-2" />
                                            Archive Chat
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Messages */}
                        <ScrollArea className="flex-1 px-4 min-h-0" ref={scrollAreaRef}>
                            <div className="space-y-3 py-4">
                                {hasMoreMessages && (
                                    <div className="flex justify-center">
                                        <Button variant="ghost" size="sm" onClick={handleLoadMore} disabled={isLoadingMessages}>
                                            {isLoadingMessages ? "Loading..." : "Load earlier messages"}
                                        </Button>
                                    </div>
                                )}

                                {isLoadingMessages && messages.length === 0 ? (
                                    <MessagesSkeleton />
                                ) : messages.length === 0 ? (
                                    <div className="flex items-center justify-center h-full py-20">
                                        <EmptyState
                                            icon={MessageSquare}
                                            title="No messages yet"
                                            description="Start the conversation by sending a message"
                                            size="sm"
                                        />
                                    </div>
                                ) : (
                                    messages.map((msg) => (
                                        <ChatBubble
                                            key={msg._id}
                                            content={msg.content}
                                            senderName={msg.sender.name}
                                            senderImage={msg.sender.image}
                                            senderRole={msg.sender.role}
                                            variant={msg.sender._id === currentUserId ? "sent" : msg.type === "system" ? "system" : "received"}
                                            timestamp={formatTime(msg.createdAt)}
                                            isEdited={msg.isEdited}
                                            replyTo={msg.replyTo}
                                            actions={
                                                <MessageActions
                                                    content={msg.content}
                                                    isOwn={msg.sender._id === currentUserId}
                                                    onReply={() => setReplyTo({ _id: msg._id, senderName: msg.sender.name, content: msg.content })}
                                                    onEdit={(content) => handleEditMessage(msg._id, content)}
                                                    onDelete={() => handleDeleteMessage(msg._id)}
                                                />
                                            }
                                        />
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>

                        {/* Message Input */}
                        <MessageInput
                            onSend={handleSendMessage}
                            replyTo={replyTo}
                            onCancelReply={() => setReplyTo(null)}
                        />
                    </>
                ) : (
                    <div className="flex flex-1 items-center justify-center">
                        <EmptyState
                            icon={MessageSquare}
                            title="Select a conversation"
                            description="Choose a conversation from the sidebar or start a new one"
                        />
                    </div>
                )}
            </div>

            {/* Right: Group/Contact Info Panel */}
            {showInfo && conversationDetail && (
                <div className="w-72 shrink-0">
                    <GroupInfoPanel
                        name={conversationDetail.name}
                        description={conversationDetail.description}
                        avatar={conversationDetail.avatar}
                        members={conversationDetail.participants}
                        type={conversationDetail.type}
                        onClose={() => setShowInfo(false)}
                    />
                </div>
            )}
        </div>
    )
}

// ============= MESSAGE ACTIONS =============
function MessageActions({
    content,
    isOwn,
    onReply,
    onEdit,
    onDelete,
}: {
    content: string
    isOwn: boolean
    onReply: () => void
    onEdit: (content: string) => void
    onDelete: () => void
}) {
    return (
        <div className="flex gap-0.5">
            <Button variant="ghost" size="icon" className="size-6" onClick={onReply} title="Reply">
                <Reply className="size-3" />
            </Button>
            {isOwn && (
                <>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        onClick={() => {
                            const newContent = prompt("Edit message:", content)
                            if (newContent && newContent !== content) onEdit(newContent)
                        }}
                        title="Edit"
                    >
                        <Pencil className="size-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-6 text-destructive" onClick={onDelete} title="Delete">
                        <Trash2 className="size-3" />
                    </Button>
                </>
            )}
        </div>
    )
}

// ============= SKELETONS =============
function MessagesSkeleton() {
    return (
        <div className="space-y-4 py-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`flex gap-2 ${i % 2 === 0 ? "" : "flex-row-reverse"}`}>
                    {i % 2 === 0 && <Skeleton className="size-8 rounded-full shrink-0" />}
                    <div className={`space-y-1 ${i % 2 === 0 ? "" : "items-end"}`}>
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className={`h-12 rounded-2xl ${i % 2 === 0 ? "w-50" : "w-65"}`} />
                    </div>
                </div>
            ))}
        </div>
    )
}

// ============= HELPERS =============
function formatTime(isoString: string): string {
    if (!isoString) return ""
    try {
        const date = new Date(isoString)
        const now = new Date()
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

        if (diffDays === 0) {
            return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
        if (diffDays === 1) return "Yesterday"
        if (diffDays < 7) return date.toLocaleDateString([], { weekday: "short" })
        return date.toLocaleDateString([], { month: "short", day: "numeric" })
    } catch {
        return isoString.split("T")[0] ?? ""
    }
}
