import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ============= CVA VARIANTS =============
const progressBarVariants = cva(
    "h-2 rounded-full transition-all duration-500",
    {
        variants: {
            variant: {
                default: "bg-primary",
                success: "bg-green-500",
                warning: "bg-amber-500",
                danger: "bg-red-500",
                info: "bg-blue-500",
            },
        },
        defaultVariants: { variant: "default" },
    }
)

// ============= COMPONENT =============
export function ProgressBar({ value, max = 100, label, showValue = true, variant, className, classNames, loading }: ProgressBarProps) {
    const pct = max > 0 ? Math.min(Math.round((value / max) * 100), 100) : 0

    return (
        <div className={cn("space-y-1", className)}>
            {(label || showValue) && (
                <div className={cn("flex items-center justify-between text-sm", classNames?.header)}>
                    {label && <span className={cn("text-muted-foreground", classNames?.label)} data-loading={loading}>{label}</span>}
                    {showValue && <span className={cn("font-medium tabular-nums", classNames?.value)} data-loading={loading}>{pct}%</span>}
                </div>
            )}
            <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", classNames?.track)}>
                <div
                    className={progressBarVariants({ variant })}
                    style={{ width: `${pct}%` }}
                    data-loading={loading}
                />
            </div>
        </div>
    )
}

// ============= TYPES =============
interface ProgressBarProps extends VariantProps<typeof progressBarVariants> {
    value: number
    max?: number
    label?: string
    showValue?: boolean
    className?: string
    classNames?: { header?: string; label?: string; value?: string; track?: string }
    loading?: boolean
}
