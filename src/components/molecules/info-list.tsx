import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

// ============= COMPONENT =============
export function InfoList({ title, description, items, className, classNames, loading }: InfoListProps) {
    return (
        <Card className={cn("@container/card", className)}>
            {(title || description) && (
                <CardHeader className={classNames?.header}>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
            )}
            <CardContent className={cn("space-y-3", classNames?.content)}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={cn(
                            "flex items-center justify-between gap-3 rounded-md border p-3 transition-colors",
                            classNames?.item
                        )}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            {item.icon && (
                                <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-md bg-muted", classNames?.icon)}>
                                    <item.icon className="size-4 text-muted-foreground" />
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className={cn("font-medium text-sm truncate", classNames?.label)} data-loading={loading}>
                                    {item.label}
                                </p>
                                {item.description && (
                                    <p className="text-xs text-muted-foreground truncate" data-loading={loading}>
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            {item.badge && <span className="text-xs text-muted-foreground" data-loading={loading}>{item.badge}</span>}
                            <span className={cn("font-semibold text-sm tabular-nums", classNames?.value)} data-loading={loading}>
                                {item.value}
                            </span>
                        </div>
                    </div>
                ))}
                {items.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground py-4">No items to display</p>
                )}
            </CardContent>
        </Card>
    )
}

// ============= TYPES =============
interface InfoListItem {
    id: string
    label: string
    value: string | number
    description?: string
    badge?: string
    icon?: LucideIcon
}

interface InfoListProps {
    title?: string
    description?: string
    items: InfoListItem[]
    className?: string
    classNames?: { header?: string; content?: string; item?: string; icon?: string; label?: string; value?: string }
    loading?: boolean
}
