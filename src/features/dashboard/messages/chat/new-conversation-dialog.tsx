"use client"

import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Users, MessageSquare } from "lucide-react"
import { postConversation } from "@/services/messages"
import { toast } from "sonner"
import type { ChatUser } from "./types"

// ============= COMPONENT =============
export function NewConversationDialog({
    currentUserId,
    users,
    onCreated,
}: {
    currentUserId: string
    users: ChatUser[]
    onCreated: (conversationId: string) => void
}) {
    const [open, setOpen] = React.useState(false)
    const [tab, setTab] = React.useState<"direct" | "group">("direct")
    const [selectedUsers, setSelectedUsers] = React.useState<string[]>([])
    const [groupName, setGroupName] = React.useState("")
    const [groupDescription, setGroupDescription] = React.useState("")
    const [searchQuery, setSearchQuery] = React.useState("")
    const [isCreating, setIsCreating] = React.useState(false)

    const filteredUsers = users.filter(
        (u) =>
            u._id !== currentUserId &&
            (u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.email.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    const toggleUser = (userId: string) => {
        if (tab === "direct") {
            setSelectedUsers([userId])
        } else {
            setSelectedUsers((prev) =>
                prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
            )
        }
    }

    const handleCreate = async () => {
        if (selectedUsers.length === 0) {
            toast.error("Select at least one user")
            return
        }
        if (tab === "group" && !groupName.trim()) {
            toast.error("Group name is required")
            return
        }

        setIsCreating(true)
        try {
            const result = await postConversation({
                type: tab,
                name: tab === "group" ? groupName : undefined,
                description: tab === "group" ? groupDescription : undefined,
                participantIds: [...selectedUsers, currentUserId],
                createdBy: currentUserId,
            })
            if (result.success && result.data) {
                toast.success(result.message)
                onCreated((result.data as { _id: string })._id)
                setOpen(false)
                resetForm()
            } else if (!result.success) {
                toast.error(result.error)
            }
        } catch {
            toast.error("Failed to create conversation")
        } finally {
            setIsCreating(false)
        }
    }

    const resetForm = () => {
        setSelectedUsers([])
        setGroupName("")
        setGroupDescription("")
        setSearchQuery("")
        setTab("direct")
    }

    return (
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm() }}>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline" className="size-8">
                    <Plus className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>New Conversation</DialogTitle>
                    <DialogDescription>Start a direct message or create a group conversation</DialogDescription>
                </DialogHeader>

                <Tabs value={tab} onValueChange={(v) => { setTab(v as "direct" | "group"); setSelectedUsers([]) }}>
                    <TabsList className="w-full">
                        <TabsTrigger value="direct" className="flex-1 gap-1.5">
                            <MessageSquare className="size-3.5" /> Direct
                        </TabsTrigger>
                        <TabsTrigger value="group" className="flex-1 gap-1.5">
                            <Users className="size-3.5" /> Group
                        </TabsTrigger>
                    </TabsList>

                    {tab === "group" && (
                        <div className="mt-3 space-y-2">
                            <div>
                                <Label htmlFor="group-name" className="text-xs">Group Name</Label>
                                <Input
                                    id="group-name"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    placeholder="e.g., Staff Coordination"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="group-desc" className="text-xs">Description (optional)</Label>
                                <Textarea
                                    id="group-desc"
                                    value={groupDescription}
                                    onChange={(e) => setGroupDescription(e.target.value)}
                                    placeholder="What's this group about?"
                                    className="mt-1"
                                    rows={2}
                                />
                            </div>
                        </div>
                    )}

                    <TabsContent value={tab} className="mt-3">
                        <div className="relative mb-2">
                            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search users..."
                                className="pl-9"
                            />
                        </div>

                        {selectedUsers.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                                {selectedUsers.map((id) => {
                                    const user = users.find((u) => u._id === id)
                                    return user ? (
                                        <Badge key={id} variant="secondary" className="gap-1 text-xs cursor-pointer" onClick={() => toggleUser(id)}>
                                            {user.name} ×
                                        </Badge>
                                    ) : null
                                })}
                            </div>
                        )}

                        <ScrollArea className="h-60">
                            <div className="space-y-0.5">
                                {filteredUsers.map((user) => (
                                    <div
                                        key={user._id}
                                        className="flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer hover:bg-accent transition-colors"
                                        onClick={() => toggleUser(user._id)}
                                    >
                                        {tab === "group" && (
                                            <Checkbox checked={selectedUsers.includes(user._id)} />
                                        )}
                                        <Avatar className="size-8">
                                            <AvatarImage src={user.image ?? undefined} />
                                            <AvatarFallback className="text-xs">
                                                {user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{user.name}</p>
                                            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                                        </div>
                                        {tab === "direct" && selectedUsers.includes(user._id) && (
                                            <Badge variant="default" className="text-[10px]">Selected</Badge>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <Button variant="outline" onClick={() => { setOpen(false); resetForm() }}>Cancel</Button>
                    <Button onClick={handleCreate} disabled={isCreating || selectedUsers.length === 0}>
                        {isCreating ? "Creating..." : tab === "direct" ? "Start Chat" : "Create Group"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
