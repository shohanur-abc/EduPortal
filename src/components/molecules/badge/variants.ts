import { cva } from "class-variance-authority";

// ============= CVA VARIANTS =============

export const badgeMoleculeVariants = cva(
    "inline-flex items-center justify-center gap-1 font-medium whitespace-nowrap transition-all",
    {
        variants: {
            size: {
                sm: "h-4 text-[10px] px-1.5 rounded-full [&>svg]:size-2.5",
                default: "h-5 text-xs px-2 rounded-full [&>svg]:size-3",
                lg: "h-6 text-sm px-2.5 rounded-full [&>svg]:size-3.5",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

export const badgeDotVariants = cva(
    "shrink-0 rounded-full",
    {
        variants: {
            size: {
                sm: "size-1.5",
                default: "size-2",
                lg: "size-2.5",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

export const badgeGroupGapVariants = cva("flex flex-wrap items-center", {
    variants: {
        gap: {
            sm: "gap-0.5",
            default: "gap-1",
            lg: "gap-2",
        },
    },
    defaultVariants: {
        gap: "default",
    },
});
