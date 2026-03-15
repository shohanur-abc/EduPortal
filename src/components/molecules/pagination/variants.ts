import { cva } from "class-variance-authority";

// ============= CVA VARIANTS =============

export const paginationItemVariants = cva(
    "inline-flex items-center justify-center transition-all",
    {
        variants: {
            state: {
                default: "",
                active: "font-semibold",
                disabled: "pointer-events-none opacity-50",
            },
        },
        defaultVariants: {
            state: "default",
        },
    }
);
