import { cva } from "class-variance-authority";

export const sectionRootVariants = cva("relative overflow-hidden", {
    variants: {
        surface: {
            none: "",
            muted: "bg-muted/30",
            card: "bg-card text-card-foreground",
            bordered: "border bg-background",
        },
        radius: {
            none: "",
            md: "rounded-md",
            lg: "rounded-xl",
            xl: "rounded-2xl",
        },
        shadow: {
            none: "",
            sm: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
        },
    },
    defaultVariants: {
        surface: "none",
        radius: "none",
        shadow: "none",
    },
});

export const sectionInnerVariants = cva("w-full", {
    variants: {
        width: {
            sm: "max-w-3xl",
            md: "max-w-5xl",
            lg: "max-w-6xl",
            xl: "max-w-7xl",
            full: "max-w-none",
        },
        padding: {
            none: "px-0 py-0",
            sm: "px-4 py-6",
            md: "px-4 py-10 sm:px-6 sm:py-12",
            lg: "px-4 py-12 sm:px-8 sm:py-16",
            xl: "px-6 py-16 sm:px-10 sm:py-24",
        },
        containerized: {
            true: "mx-auto",
            false: "",
        },
    },
    defaultVariants: {
        width: "xl",
        padding: "lg",
        containerized: true,
    },
});

export const sectionHeaderVariants = cva("mb-8 flex flex-col gap-3", {
    variants: {
        align: {
            left: "items-start text-left",
            center: "items-center text-center",
            right: "items-end text-right",
        },
    },
    defaultVariants: {
        align: "left",
    },
});

export const sectionEyebrowVariants = cva("text-primary text-xs font-semibold tracking-[0.18em] uppercase");

export const sectionTitleVariants = cva("text-foreground text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl");

export const sectionSubtitleVariants = cva("text-muted-foreground max-w-prose text-sm sm:text-base");

export const sectionDividerVariants = cva("bg-border mt-1 h-px w-full");

export const sectionContentVariants = cva("w-full", {
    variants: {
        layout: {
            stack: "flex flex-col gap-4",
            "grid-2": "grid grid-cols-1 gap-4 md:grid-cols-2",
            "grid-3": "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
            "grid-4": "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4",
        },
    },
    defaultVariants: {
        layout: "stack",
    },
});
