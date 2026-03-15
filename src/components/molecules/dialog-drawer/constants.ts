// ============= LAYOUT CONSTANTS =============

export const textAlign = {
    left: "",
    center: "text-center",
    right: "text-right",
} as const;

export const alignItems = {
    left: "",
    center: "items-center flex-col",
    right: "flex-row-reverse",
} as const;

export const justifyContent = {
    left: "",
    center: "justify-center sm:justify-center",
    right: "flex-col-reverse",
} as const;

export const iconSize = {
    left: "size-8 *:size-4",
    center: "size-14 *:size-7",
    right: "size-8 *:size-4",
} as const;
