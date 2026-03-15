import { cva } from "class-variance-authority";

// ============= CVA VARIANTS =============

export const avatarStatusVariants = cva(
    "absolute bottom-0 right-0 z-10 rounded-full ring-2 ring-background",
    {
        variants: {
            status: {
                online: "bg-emerald-500",
                offline: "bg-muted-foreground/50",
                busy: "bg-destructive",
                away: "bg-amber-500",
            },
            size: {
                sm: "size-1.5",
                default: "size-2.5",
                lg: "size-3",
            },
        },
        defaultVariants: {
            status: "online",
            size: "default",
        },
    }
);

export const avatarShapeVariants = cva("", {
    variants: {
        shape: {
            circle: "rounded-full",
            square: "rounded-lg",
        },
    },
    defaultVariants: {
        shape: "circle",
    },
});
