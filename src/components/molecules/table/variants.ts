import { cva } from "class-variance-authority"

// ============= CVA VARIANTS =============

/** Controls row height (density) */
export const tableRowVariants = cva("transition-colors", {
    variants: {
        density: {
            compact: "[&_td]:py-1 [&_th]:py-1",
            default: "[&_td]:py-2 [&_th]:py-2",
            comfortable: "[&_td]:py-4 [&_th]:py-4",
        },
        striped: {
            true: "even:bg-muted/40",
            false: "",
        },
        clickable: {
            true: "cursor-pointer hover:bg-muted/50",
            false: "hover:bg-muted/20",
        },
        selected: {
            true: "bg-accent text-accent-foreground",
            false: "",
        },
    },
    defaultVariants: {
        density: "default",
        striped: false,
        clickable: false,
        selected: false,
    },
})

/** Table wrapper scroll container */
export const tableWrapperVariants = cva("overflow-auto rounded-md", {
    variants: {
        bordered: {
            true: "border",
            false: "",
        },
        stickyHeader: {
            true: "max-h-[500px]",
            false: "",
        },
    },
    defaultVariants: {
        bordered: true,
        stickyHeader: false,
    },
})

/** <thead> variants */
export const tableHeadVariants = cva("bg-muted/50", {
    variants: {
        sticky: {
            true: "sticky top-0 z-10",
            false: "",
        },
    },
    defaultVariants: {
        sticky: false,
    },
})

/** Sortable header button */
export const sortableHeaderVariants = cva(
    "inline-flex items-center gap-1.5 whitespace-nowrap rounded px-2 -ml-2 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground capitalize",
    {
        variants: {
            sorted: {
                true: "text-foreground",
                false: "text-muted-foreground",
            },
        },
        defaultVariants: {
            sorted: false,
        },
    }
)

/** Loading skeleton cell */
export const skeletonCellVariants = cva("animate-pulse rounded bg-muted", {
    variants: {
        density: {
            compact: "h-3",
            default: "h-4",
            comfortable: "h-5",
        },
    },
    defaultVariants: { density: "default" },
})
