"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { X, Pencil, Users } from "lucide-react"

// ============= COMPONENT =============
export function GroupInfoPanel({
    name,
    description,
    avatar,
    members,
    type,
    attachmentCount,
    fileCount,
    onClose,
    onEdit,
    className,
}: GroupInfoPanelProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <div className={cn("flex h-full flex-col border-l bg-background", className)}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <h3 className="font-semibold text-sm">
                    {type === "group" ? "Group Info" : "Chat Info"}
                </h3>
                <div className="flex items-center gap-1">
                    {onEdit && (
                        <Button variant="ghost" size="icon" className="size-7" onClick={onEdit}>
                            <Pencil className="size-3.5" />
                        </Button>
                    )}
                    <Button variant="ghost" size="icon" className="size-7" onClick={onClose}>
                        <X className="size-3.5" />
                    </Button>
                </div>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                    {/* Avatar & Name */}
                    <div className="flex flex-col items-center text-center gap-2">
                        <Avatar className="size-20">
                            <AvatarImage src={avatar ?? undefined} alt={name} />
                            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-semibold">{name}</h4>
                            <p className="text-xs text-muted-foreground">
                                {type === "group" ? `Group • ${members.length} members` : "Direct message"}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    {description && (
                        <>
                            <Separator />
                            <div>
                                <h5 className="text-xs font-medium text-muted-foreground mb-1">Description</h5>
                                <p className="text-sm">{description}</p>
                            </div>
                        </>
                    )}

                    {/* Members */}
                    <Separator />
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h5 className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                <Users className="size-3" /> Members
                            </h5>
                            <span className="text-xs text-muted-foreground">View All</span>
                        </div>
                        <div className="space-y-2">
                            {members.map((member) => (
                                <div key={member._id} className="flex items-center gap-2.5">
                                    <Avatar className="size-8">
                                        <AvatarImage src={member.image ?? undefined} alt={member.name} />
                                        <AvatarFallback className="text-xs">
                                            {member.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-sm font-medium truncate">{member.name}</span>
                                            {member.participantRole === "admin" && (
                                                <Badge variant="secondary" className="text-[10px] px-1 py-0">Admin</Badge>
                                            )}
                                        </div>
                                        <span className="text-xs text-muted-foreground capitalize">{member.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Media & Files */}
                    {(attachmentCount || fileCount) && (
                        <>
                            <Separator />
                            <div>
                                <h5 className="text-xs font-medium text-muted-foreground mb-2">Attachment</h5>
                                <div className="flex gap-2">
                                    {attachmentCount !== undefined && (
                                        <Badge variant="outline" className="text-xs">
                                            Media • {attachmentCount}
                                        </Badge>
                                    )}
                                    {fileCount !== undefined && (
                                        <Badge variant="outline" className="text-xs">
                                            Files • {fileCount}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}

// ============= TYPES =============
interface GroupInfoMember {
    _id: string
    name: string
    image: string | null
    role: string
    participantRole: "admin" | "member"
}

interface GroupInfoPanelProps {
    name: string
    description?: string
    avatar?: string | null
    members: GroupInfoMember[]
    type: "direct" | "group"
    attachmentCount?: number
    fileCount?: number
    onClose: () => void
    onEdit?: () => void
    className?: string
}
