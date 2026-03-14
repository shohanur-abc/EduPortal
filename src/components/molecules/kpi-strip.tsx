import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "@/lib/icon"

// ============= CVA VARIANTS =============
const kpiVariants = cva(
    "flex items-center gap-3 rounded-lg border p-4",
    {
        variants: {
            variant: {
                default: "",
                success: "border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/30",
                warning: "border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/30",
                danger: "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/30",
                info: "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/30",
            },
        },
        defaultVariants: { variant: "default" },
    }
)

// ============= COMPONENT =============
export function KpiStrip({ items, className, loading }: KpiStripProps) {
    return (
        <div className={cn("grid grid-cols-2 gap-3 @lg:grid-cols-4", className)}>
            {items.map((item) => (
                <div key={item.id} className={kpiVariants({ variant: item.variant })}>
                    {item.icon && (
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background shadow-sm">
                            <item.icon className="size-4" />
                        </div>
                    )}
                    <div className="min-w-0">
                        <p className="text-xs text-muted-foreground truncate">{item.label}</p>
                        <p className="text-lg font-bold tabular-nums" data-loading={loading}>{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

// ============= TYPES =============
interface KpiItem extends VariantProps<typeof kpiVariants> {
    id: string
    label: string
    value: string | number
    icon?: LucideIcon
}

interface KpiStripProps {
    items: KpiItem[]
    className?: string
    loading?: boolean
}
