import { cva } from "class-variance-authority";

// ============= CVA VARIANTS =============

export const dropdownItemVariants = cva(
    "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
    {
        variants: {
            intent: {
                default: "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                destructive:
                    "text-destructive focus:bg-destructive/10 focus:text-destructive data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            },
            inset: {
                true: "pl-8",
                false: "",
            },
        },
        defaultVariants: {
            intent: "default",
            inset: false,
        },
    }
);
