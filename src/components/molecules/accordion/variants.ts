import { cva } from "class-variance-authority";

export const accordionRootVariants = cva("w-full", {
    variants: {
        variant: {
            default: "rounded-lg border border-border bg-card shadow-xs",
            outline: "rounded-lg border border-border bg-transparent",
            ghost: "bg-transparent",
            separated: "flex flex-col gap-2",
        },
    },
    defaultVariants: { variant: "default" },
});

export const accordionItemVariants = cva("", {
    variants: {
        variant: {
            default: "hover:bg-muted/50  not-last:border-b border-border",
            outline: "hover:bg-muted/40  not-last:border-b border-border",
            ghost: "hover:bg-muted/60  not-last:border-b border-border",
            separated: " hover:bg-muted/50 rounded-lg border border-border bg-card shadow-xs",
        },
    },
    defaultVariants: { variant: "default" },
});

export const accordionTriggerVariants = cva(
    "flex w-full cursor-pointer items-center gap-2.5 px-4 py-3 text-sm font-medium transition-all",
    {
        variants: {
            variant: {
                default: "first:rounded-t-lg last:rounded-b-lg",
                outline: "first:rounded-t-lg last:rounded-b-lg",
                ghost: "first:rounded-t-lg last:rounded-b-lg",
                separated: "rounded-lg",
            },
        },
        defaultVariants: { variant: "default" },
    }
);
