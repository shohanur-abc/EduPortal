import { cva, type VariantProps } from "class-variance-authority"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

// ============= CVA VARIANTS =============
const metricVariants = cva(
    "flex size-10 items-center justify-center rounded-lg",
    {
        variants: {
            variant: {
                default: "bg-primary/10 text-primary",
                success: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
                warning: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
                danger: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
                info: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
            },
        },
        defaultVariants: { variant: "default" },
    }
)

// ============= COMPONENT =============
export function MetricCard({ title, value, subtitle, icon: Icon, variant, footer, className, loading }: MetricCardProps) {
    return (
        <Card className={cn("@container/card gap-0", className)}>
            <CardHeader className="pb-2">
                <CardDescription className="text-xs">{title}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div className={metricVariants({ variant })}>
                            <Icon className="size-5" />
                        </div>
                    )}
                    <div>
                        <CardTitle className="text-2xl font-bold tabular-nums" data-loading={loading}>{value}</CardTitle>
                        {subtitle && <p className="text-xs text-muted-foreground" data-loading={loading}>{subtitle}</p>}
                    </div>
                </div>
                {footer && <div className="mt-3 text-xs text-muted-foreground border-t pt-2">{footer}</div>}
            </CardContent>
        </Card>
    )
}

// ============= TYPES =============
interface MetricCardProps extends VariantProps<typeof metricVariants> {
    title: string
    value: string | number
    subtitle?: string
    icon?: LucideIcon
    footer?: ReactNode
    className?: string
    loading?: boolean
}
