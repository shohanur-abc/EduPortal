import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ProgressBar } from "./progress-bar"

// ============= COMPONENT =============
export function ProgressList({ title, description, items, className, classNames, loading }: ProgressListProps) {
    return (
        <Card className={cn("@container/card", className)}>
            {(title || description) && (
                <CardHeader className={classNames?.header}>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
            )}
            <CardContent className={cn("space-y-4", classNames?.content)}>
                {items.map((item, i) => (
                    <ProgressBar
                        key={item.id ?? `item-${i}`}
                        label={item.label}
                        value={item.value}
                        max={item.max ?? item.maxValue}
                        variant={item.variant}
                        loading={loading}
                    />
                ))}
                {items.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground py-4">No items to display</p>
                )}
            </CardContent>
        </Card>
    )
}

// ============= TYPES =============
export interface ProgressItem {
    id?: string
    label: string
    value: number
    max?: number
    maxValue?: number
    suffix?: string
    variant?: "default" | "success" | "warning" | "danger" | "info"
}

interface ProgressListProps {
    title?: string
    description?: string
    items: ProgressItem[]
    className?: string
    classNames?: { header?: string; content?: string }
    loading?: boolean
}
