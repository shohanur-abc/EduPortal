import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { attendanceTextColors } from "@/lib/color"
import { cn } from "@/lib/utils"
import { HoverCard } from "./hover-card"
import { MessageSquare } from "lucide-react"

// ============= COMPONENT =============
export function AvatarCell({ name, secondary, image, className, status, remarks, ...props }: AvatarCellProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)


    return (
        <div className={cn("flex items-center gap-3", className)} {...props}>
            <Avatar className="size-8">
                <AvatarImage src={image ?? undefined} alt={name} />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
                <span className={cn("text-sm font-medium leading-none flex gap-2", status && attendanceTextColors[status])}>{name} {remarks && <HoverCard openDelay={200} trigger={<MessageSquare className="size-3.5" />}>{remarks}</HoverCard>}</span>
                {secondary && <span className="text-xs leading-none text-muted-foreground">{secondary}</span>}
            </div>
        </div>
    )
}


// ============= TYPES =============
interface AvatarCellProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    status?: "present" | "absent" | "late" | "excused"
    remarks?: string
    secondary?: string
    image?: string | null
    className?: string
}
