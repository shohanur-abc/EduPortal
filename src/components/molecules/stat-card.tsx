import { cva, type VariantProps } from "class-variance-authority"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react"
import { ReactNode } from "react"



export function StatCard({ title, value, description, trend, trendValue, icon: Icon, footer, variant, className, loading = false }: StatCardProps) {
    const TrendIcon = trend ? TREND_ICONS[trend] : null

    return (
        <Card className={cn(statCardVariants({ variant }), className)}>
            <CardHeader className="flex-1">
                <CardDescription className="flex items-center gap-2">
                    {Icon && <Icon className="size-4" />}
                    {title}
                </CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl" data-loading={loading}>
                    {value}
                </CardTitle>
                {trendValue && (
                    <CardAction>
                        <Badge variant="outline" className={cn(trendBadgeVariants({ trend }))}>
                            {TrendIcon && <TrendIcon className="size-3" />}
                            {trendValue}
                        </Badge>
                    </CardAction>
                )}
            </CardHeader>
            {(description || footer) && (
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    {description && (
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {description}
                            {TrendIcon && <TrendIcon className="size-4" />}
                        </div>
                    )}
                    {footer && <div className="text-muted-foreground">{footer}</div>}
                </CardFooter>
            )}
        </Card>
    )
}


const TREND_ICONS = { up: TrendingUp, down: TrendingDown, neutral: Minus } as const


// ============= CVA VARIANTS =============
const statCardVariants = cva(
    "@container/card",
    {
        variants: {
            variant: {
                default: "",
                success: "border-green-200 dark:border-green-900",
                warning: "border-amber-200 dark:border-amber-900",
                danger: "border-red-200 dark:border-red-900",
                info: "border-blue-200 dark:border-blue-900",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const trendBadgeVariants = cva(
    "",
    {
        variants: {
            trend: {
                up: "text-green-700 dark:text-green-400",
                down: "text-red-700 dark:text-red-400",
                neutral: "text-muted-foreground",
            },
        },
        defaultVariants: {
            trend: "neutral",
        },
    }
)


// ============= TYPES =============
interface StatCardProps extends VariantProps<typeof statCardVariants> {
    title: string
    value: string | number
    description?: string
    trend?: "up" | "down" | "neutral"
    trendValue?: string
    icon?: LucideIcon
    footer?: ReactNode
    className?: string
    loading?: boolean
}

