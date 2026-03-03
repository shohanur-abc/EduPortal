import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { AvatarCell } from "./avatar-cell"

// ============= COMPONENT =============
export function ActivityFeed({ title, description, items, className, classNames, loading }: ActivityFeedProps) {
    return (
        <Card className={cn("@container/card", className)}>
            {(title || description) && (
                <CardHeader className={classNames?.header}>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
            )}
            <CardContent className={cn("space-y-0", classNames?.content)}>
                {items.map((item, i) => (
                    <div
                        key={item.id}
                        className={cn(
                            "flex items-start gap-3 py-3",
                            i < items.length - 1 && "border-b",
                            classNames?.item,
                        )}
                    >
                        <div className="shrink-0 pt-0.5">
                            <AvatarCell name={item.name} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium truncate" data-loading={loading}>{item.name}</p>
                                {item.badge && (
                                    <Badge variant="outline" className="text-[10px] px-1.5" data-loading={loading}>
                                        {item.badge}
                                    </Badge>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground" data-loading={loading}>{item.description}</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground shrink-0 pt-1" data-loading={loading}>{item.time}</span>
                    </div>
                ))}
                {items.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground py-4">No recent activity</p>
                )}
            </CardContent>
        </Card>
    )
}

// ============= TYPES =============
interface ActivityItem {
    id: string
    name: string
    description: string
    time: string
    badge?: string
}

interface ActivityFeedProps {
    title?: string
    description?: string
    items: ActivityItem[]
    className?: string
    classNames?: { header?: string; content?: string; item?: string }
    loading?: boolean
}
