import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// ============= COMPONENT =============
export function AvatarCell({ name, secondary, image, className, ...props }: AvatarCellProps) {
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
            <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">{name}</span>
                {secondary && <span className="text-xs text-muted-foreground">{secondary}</span>}
            </div>
        </div>
    )
}

// ============= TYPES =============
interface AvatarCellProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    secondary?: string
    image?: string | null
    className?: string
}
