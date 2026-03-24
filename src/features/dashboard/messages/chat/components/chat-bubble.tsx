"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { AvatarMolecule } from "@/components/molecules"
import { cn } from "@/lib/utils"

// ============= CVA VARIANTS =============
const bubbleVariants = cva(
    "relative max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
    {
        variants: {
            variant: {
                sent: "bg-primary text-primary-foreground ml-auto rounded-br-sm",
                received: "bg-muted text-foreground mr-auto rounded-bl-sm",
                system: "bg-muted/50 text-muted-foreground mx-auto text-center text-xs italic max-w-[90%] rounded-lg",
            },
        },
        defaultVariants: { variant: "received" },
    }
)

// ============= COMPONENT =============
export function ChatBubble({
    content,
    senderName,
    senderImage,
    senderRole,
    variant = "received",
    timestamp,
    isEdited,
    replyTo,
    className,
    actions,
}: ChatBubbleProps) {
    if (variant === "system") {
        return (
            <div className={cn(bubbleVariants({ variant }), className)}>
                <p>{content}</p>
                {timestamp && <span className="mt-1 block text-[10px] opacity-60">{timestamp}</span>}
            </div>
        )
    }

    const isSent = variant === "sent"
    const initials = senderName
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <div className={cn("group flex gap-2", isSent ? "flex-row-reverse" : "flex-row", className)}>
            {!isSent && (
                <AvatarMolecule src={senderImage ?? undefined} alt={senderName} fallback={initials} className="size-8 shrink-0 mt-1" classNames={{ fallback: "text-xs" }} />
            )}
            <div className={cn("flex flex-col gap-0.5", isSent ? "items-end" : "items-start")}>
                {!isSent && (
                    <div className="flex items-center gap-2 px-1">
                        <span className="text-xs font-medium">{senderName}</span>
                        {senderRole && (
                            <span className="text-[10px] text-muted-foreground capitalize">{senderRole}</span>
                        )}
                    </div>
                )}
                {replyTo && (
                    <div className="mb-1 rounded-lg border-l-2 border-primary/40 bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground max-w-[90%]">
                        <span className="font-medium">{replyTo.senderName}</span>
                        <p className="line-clamp-1">{replyTo.content}</p>
                    </div>
                )}
                <div className={cn(bubbleVariants({ variant }))}>
                    <p className="whitespace-pre-wrap wrap-break-word">{content}</p>
                    <div className={cn("mt-1 flex items-center gap-1 text-[10px]", isSent ? "justify-end opacity-70" : "opacity-50")}>
                        {timestamp && <span>{timestamp}</span>}
                        {isEdited && <span>(edited)</span>}
                    </div>
                </div>
                {actions && (
                    <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    )
}

// ============= TYPES =============
interface ChatBubbleProps extends VariantProps<typeof bubbleVariants> {
    content: string
    senderName?: string
    senderImage?: string | null
    senderRole?: string
    timestamp?: string
    isEdited?: boolean
    replyTo?: { senderName: string; content: string } | null
    className?: string
    actions?: React.ReactNode
}
