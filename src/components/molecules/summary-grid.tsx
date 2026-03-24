import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// ============= COMPONENT =============
export function SummaryGrid({ title, description, items, className, classNames, loading, columns = 2 }: SummaryGridProps) {
    return (
        <Card className={cn("@container/card", className)}>
            {(title || description) && (
                <CardHeader className={classNames?.header}>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
            )}
            <CardContent>
                <div
                    className={cn(
                        "grid gap-4",
                        columns === 1 && "grid-cols-1",
                        columns === 2 && "grid-cols-2",
                        columns === 3 && "grid-cols-3",
                        columns === 4 && "grid-cols-2 @sm:grid-cols-4",
                        classNames?.grid
                    )}
                >
                    {items.map((item, i) => (
                        <div key={item.id ?? `item-${i}`} className={cn("space-y-1 rounded-lg border p-3 text-center", classNames?.item)}>
                            <p className="text-2xl font-bold tabular-nums" data-loading={loading}>
                                {item.value}
                            </p>
                            <p className={cn("text-xs text-muted-foreground", classNames?.label)} data-loading={loading}>
                                {item.label}
                            </p>
                            {item.subtitle && (
                                <p className="text-xs text-muted-foreground/70" data-loading={loading}>
                                    {item.subtitle}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

// ============= TYPES =============
interface SummaryItem {
    id?: string
    label: string
    value: string | number
    subtitle?: string
    icon?: React.ComponentType<{ className?: string }>
}

interface SummaryGridProps {
    title?: string
    description?: string
    items: SummaryItem[]
    columns?: 1 | 2 | 3 | 4
    className?: string
    classNames?: { header?: string; grid?: string; item?: string; label?: string }
    loading?: boolean
}

// ============= SKELETON =============
export function SummaryGridSkeleton({ className, columns = 2 }: { className?: string; columns?: 2 | 3 | 4 }) {
    return (
        <Card className={cn("@container/card", className)}>
            <CardHeader>
                <div className="h-5 w-40 rounded bg-muted animate-pulse" />
                <div className="h-4 w-56 rounded bg-muted animate-pulse" />
            </CardHeader>
            <CardContent>
                <div
                    className={cn(
                        "grid gap-4",
                        columns === 2 && "grid-cols-2",
                        columns === 3 && "grid-cols-3",
                        columns === 4 && "grid-cols-2 @sm:grid-cols-4",
                    )}
                >
                    {Array.from({ length: columns === 4 ? 4 : columns }).map((_, i) => (
                        <div key={i} className="space-y-1 rounded-lg border p-3 text-center">
                            <div className="mx-auto h-7 w-16 rounded bg-muted animate-pulse" />
                            <div className="mx-auto h-4 w-20 rounded bg-muted animate-pulse" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
