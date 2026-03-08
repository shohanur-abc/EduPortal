"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Send, Paperclip, X } from "lucide-react"

// ============= COMPONENT =============
export function MessageInput({
    onSend,
    onAttach,
    disabled,
    placeholder = "Type your message...",
    replyTo,
    onCancelReply,
    className,
}: MessageInputProps) {
    const [message, setMessage] = React.useState("")
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!message.trim() || disabled) return
        onSend(message.trim())
        setMessage("")
        textareaRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className={cn("border-t bg-background", className)}>
            {replyTo && (
                <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-4 py-2">
                    <div className="min-w-0">
                        <span className="text-xs font-medium text-primary">Replying to {replyTo.senderName}</span>
                        <p className="text-xs text-muted-foreground truncate">{replyTo.content}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="size-6 shrink-0" onClick={onCancelReply}>
                        <X className="size-3.5" />
                    </Button>
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-end gap-2 p-3">
                <TooltipProvider>
                    {onAttach && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button type="button" variant="ghost" size="icon" className="size-9 shrink-0" onClick={onAttach}>
                                    <Paperclip className="size-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Attach file</TooltipContent>
                        </Tooltip>
                    )}
                </TooltipProvider>
                <Textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="min-h-10 max-h-30 resize-none flex-1"
                    rows={1}
                />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="submit"
                                size="icon"
                                className="size-9 shrink-0 rounded-full"
                                disabled={!message.trim() || disabled}
                            >
                                <Send className="size-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Send message</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </form>
        </div>
    )
}

// ============= TYPES =============
interface MessageInputProps {
    onSend: (message: string) => void
    onAttach?: () => void
    disabled?: boolean
    placeholder?: string
    replyTo?: { senderName: string; content: string } | null
    onCancelReply?: () => void
    className?: string
}
