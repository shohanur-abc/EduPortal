import { cva } from "class-variance-authority";

// ============= CVA VARIANTS =============

export const breadcrumbLinkVariants = cva(
    "inline-flex items-center gap-1 text-sm transition-colors",
    {
        variants: {
            state: {
                default: "text-muted-foreground hover:text-foreground",
                current: "font-normal text-foreground pointer-events-none",
                disabled: "text-muted-foreground/50 pointer-events-none",
            },
        },
        defaultVariants: {
            state: "default",
        },
    }
);
