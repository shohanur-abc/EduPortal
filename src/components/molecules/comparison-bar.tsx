import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// ============= COMPONENT =============
export function ComparisonBar({ title, description, items, className, classNames, loading }: ComparisonBarProps) {
    const max = Math.max(...items.map((i) => i.value), 1)

    return (
        <Card className={cn("@container/card", className)}>
            {(title || description) && (
                <CardHeader className={classNames?.header}>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
            )}
            <CardContent className={cn("space-y-3", classNames?.content)}>
                {items.map((item, i) => (
                    <div key={item.id ?? `item-${i}`} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground" data-loading={loading}>{item.label}</span>
                            <span className="font-medium tabular-nums" data-loading={loading}>{item.value}{item.suffix}</span>
                        </div>
                        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                            <div
                                className={cn("h-full rounded-full transition-all duration-700", item.color ?? "bg-primary")}
                                style={{ width: `${(item.value / max) * 100}%` }}
                                data-loading={loading}
                            />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

// ============= TYPES =============
interface ComparisonItem {
    id?: string
    label: string
    value: number
    suffix?: string
    color?: string
    percentage?: number
}

interface ComparisonBarProps {
    title?: string
    description?: string
    items: ComparisonItem[]
    className?: string
    classNames?: { header?: string; content?: string }
    loading?: boolean
}

// ============= SKELETON =============
export function ComparisonBarSkeleton({ className }: { className?: string }) {
    return (
        <Card className={cn("@container/card", className)}>
            <CardHeader>
                <div className="h-5 w-40 rounded bg-muted animate-pulse" />
                <div className="h-4 w-56 rounded bg-muted animate-pulse" />
            </CardHeader>
            <CardContent className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between">
                            <div className="h-4 w-20 rounded bg-muted animate-pulse" />
                            <div className="h-4 w-12 rounded bg-muted animate-pulse" />
                        </div>
                        <div className="h-3 w-full rounded-full bg-muted animate-pulse" />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
