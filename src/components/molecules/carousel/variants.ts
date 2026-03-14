import { cva } from "class-variance-authority";

// ============= CVA VARIANTS =============

export const carouselDotVariants = cva(
    "size-2 rounded-full transition-all cursor-pointer",
    {
        variants: {
            state: {
                default: "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                active: "bg-primary scale-125",
            },
        },
        defaultVariants: {
            state: "default",
        },
    }
);

export const carouselCounterVariants = cva(
    "text-center text-sm text-muted-foreground tabular-nums",
    {
        variants: {
            position: {
                bottom: "mt-2",
                overlay: "absolute bottom-2 left-1/2 -translate-x-1/2 bg-background/80 px-2 py-0.5 rounded-full text-xs backdrop-blur-sm",
            },
        },
        defaultVariants: {
            position: "bottom",
        },
    }
);
