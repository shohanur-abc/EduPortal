import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { FileX, type LucideIcon } from "lucide-react"

// ============= CVA VARIANTS =============
const emptyStateVariants = cva(
    "flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center",
    {
        variants: {
            size: {
                sm: "py-6 gap-2",
                default: "py-12 gap-3",
                lg: "py-16 gap-4",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

// ============= COMPONENT =============
export function EmptyState({ icon: Icon = FileX, title, description, size, className }: EmptyStateProps) {
    return (
        <div className={cn(emptyStateVariants({ size }), className)}>
            <div className="bg-muted rounded-full p-3">
                <Icon className="size-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">{title}</h3>
            {description && <p className="text-sm text-muted-foreground max-w-sm">{description}</p>}
        </div>
    )
}

// ============= TYPES =============
interface EmptyStateProps extends VariantProps<typeof emptyStateVariants> {
    icon?: LucideIcon
    title: string
    description?: string
    className?: string
}
