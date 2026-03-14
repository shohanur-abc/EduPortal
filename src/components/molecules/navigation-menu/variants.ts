import { cva } from "class-variance-authority";

// ============= CVA VARIANTS =============

/** Grid layout for group content */
export const navMenuContentLayoutVariants = cva("grid gap-1 p-2", {
    variants: {
        layout: {
            list: "w-[300px] grid-cols-1",
            "grid-2": "w-[500px] grid-cols-2",
            "grid-3": "w-[680px] grid-cols-3",
        },
    },
    defaultVariants: {
        layout: "list",
    },
});

/** Mega menu content wrapper (always full-width flex) */
export const navMenuMegaVariants = cva(
    "flex w-[860px] gap-0 overflow-hidden rounded-xl",
    {
        variants: {
            hasFeatured: {
                true: "",
                false: "",
            },
        },
    }
);

/** Each mega section column */
export const navMenuMegaSectionVariants = cva("flex flex-col gap-0.5 p-3 min-w-0", {
    variants: {
        size: {
            default: "flex-1",
            sm: "w-40",
            lg: "w-56",
        },
    },
    defaultVariants: { size: "default" },
});

/** Link item inside a dropdown */
export const navMenuLinkVariants = cva(
    "flex items-start gap-3 rounded-md p-2 text-sm transition-colors outline-none hover:bg-muted focus:bg-muted",
    {
        variants: {
            state: {
                default: "",
                active: "bg-muted/50",
                disabled: "pointer-events-none opacity-50",
            },
        },
        defaultVariants: {
            state: "default",
        },
    }
);

/** Badge on individual items ("New", "Beta", "Hot", etc.) */
export const navItemBadgeVariants = cva(
    "inline-flex items-center rounded-full px-1.5 py-0 text-[10px] font-semibold leading-4 tracking-wide uppercase shrink-0",
    {
        variants: {
            variant: {
                default: "bg-foreground text-background",
                secondary: "bg-secondary text-secondary-foreground",
                destructive: "bg-destructive/15 text-destructive",
                success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
            },
        },
        defaultVariants: { variant: "default" },
    }
);

/** Action button variant */
export const navActionVariants = cva(
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
    {
        variants: {
            variant: {
                default:
                    "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
                primary:
                    "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                ghost: "hover:bg-accent hover:text-accent-foreground",
            },
        },
        defaultVariants: { variant: "default" },
    }
);
