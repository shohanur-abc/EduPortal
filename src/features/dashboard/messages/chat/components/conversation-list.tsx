"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { MessageSquare, Phone, Search, Settings, Users, Wifi } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ============= CVA VARIANTS =============
const listItemVariants = cva(
    "flex cursor-pointer items-center gap-3 px-3 py-3 transition-colors hover:bg-muted/40",
    {
        variants: {
            active: {
                true: "bg-accent",
                false: "",
            },
        },
        defaultVariants: { active: false },
    }
)

// ============= COMPONENT =============
export function ConversationList({
    conversations,
    activeId,
    onSelect,
    onSearch,
    searchPlaceholder = "Search conversations...",
    className,
    header,
}: ConversationListProps) {
    const [search, setSearch] = React.useState("")
    const [tab, setTab] = React.useState("message")
    const handleSearch = (value: string) => {
        setSearch(value)
        onSearch?.(value)
    }

    const filtered = React.useMemo(() => {
        if (!search.trim() || onSearch) return conversations
        return conversations.filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [conversations, search, onSearch])

    return (
        <Tabs className={cn("flex h-full flex-col", className)} value={tab} onValueChange={(value) => setTab(value)}>
            {/* {header && <div className="px-3 pt-3">{header}</div>}*/}
            <div className="px-3 pt-3 capitalize">{tab}</div>
            <div className="px-3">

                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="pl-9 h-9"
                    />
                </div>
            </div>
            <ScrollArea className="flex-1">
                <div className="space-y-0.5">
                    {filtered.length === 0 ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">No conversations found</p>
                    ) : (
                        filtered.map((conversation) => (
                            <div
                                key={conversation._id}
                                className={cn(listItemVariants({ active: conversation._id === activeId }))}
                                onClick={() => onSelect(conversation._id)}
                            >
                                <div className="relative">
                                    <Avatar className="size-10 outline-1">
                                        <AvatarImage src={conversation.avatar ?? undefined} alt={conversation.name} />
                                        <AvatarFallback className="text-xs">
                                            {conversation.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {conversation.isOnline && (
                                        <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium truncate">{conversation.name}</span>
                                        {conversation.lastMessageTime && (
                                            <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                                                {conversation.lastMessageTime}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-muted-foreground truncate max-w-45">
                                            {conversation.lastMessage || "No messages yet"}
                                        </p>
                                        {(conversation.unreadCount ?? 0) > 0 && (
                                            <Badge
                                                variant="default"
                                                className="size-5 shrink-0 justify-center rounded-full p-0 text-[10px]"
                                            >
                                                {conversation.unreadCount}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </ScrollArea>
            <TabsList className="border-t justify-around w-full" variant='line'>
                <TabsTrigger value="message"><MessageSquare /></TabsTrigger>
                <TabsTrigger value="online"><Wifi /></TabsTrigger>
                <TabsTrigger value="group"><Users /></TabsTrigger>
                <TabsTrigger value="settings"><Settings /></TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

// ============= TYPES =============
export interface ConversationListItem {
    _id: string
    name: string
    avatar?: string | null
    lastMessage?: string
    lastMessageTime?: string
    unreadCount?: number
    isOnline?: boolean
    type: "direct" | "group"
}

interface ConversationListProps extends VariantProps<typeof listItemVariants> {
    conversations: ConversationListItem[]
    activeId?: string
    onSelect: (id: string) => void
    onSearch?: (query: string) => void
    searchPlaceholder?: string
    className?: string
    header?: React.ReactNode
}
