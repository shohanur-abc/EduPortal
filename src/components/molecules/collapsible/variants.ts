import { cva } from "class-variance-authority";

export const collapsibleRootVariants = cva("w-full rounded-lg", {
    variants: {
        variant: {
            default: "bg-card text-card-foreground shadow-xs",
            outline: "border border-border bg-transparent",
            ghost: "bg-transparent",
        },
    },
    defaultVariants: { variant: "default" },
});

export const collapsibleTriggerVariants = cva(
    "flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "hover:bg-muted/60 rounded-lg",
                outline: "hover:bg-muted/40 rounded-lg",
                ghost: "hover:bg-muted/60 rounded-lg",
            },
            disabled: {
                true: "pointer-events-none opacity-50",
                false: "",
            },
        },
        defaultVariants: { variant: "default", disabled: false },
    }
);
