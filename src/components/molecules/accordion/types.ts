import type * as React from "react";
import type { LucideIcon } from "lucide-react";

// ============= TYPES =============

export interface AccordionClassNames {
    root?: string;
    item?: string;
    trigger?: string;
    triggerIcon?: string;
    title?: string;
    badge?: string;
    description?: string;
    content?: string;
    contentInner?: string;
}

export interface AccordionItemDef {
    /** Unique value for the item */
    value: string;
    /** Trigger label */
    title: React.ReactNode;
    /** Content revealed when open */
    content: React.ReactNode;
    /** Optional icon before title */
    icon?: LucideIcon;
    /** Optional badge / tag beside the title */
    badge?: React.ReactNode;
    /** Optional sub-text below the title */
    description?: string;
    /** Disable this item */
    disabled?: boolean;
    /** Extra className on the AccordionItem */
    className?: string;
}

/** Single-select accordion (only one item open at a time) */
export interface AccordionSingleProps {
    type?: "single";
    items: AccordionItemDef[];
    /** Controlled value */
    value?: string;
    onValueChange?: (value: string) => void;
    defaultValue?: string;
    /** Allow collapsing the open item (single mode) */
    collapsible?: boolean;
    variant?: "default" | "outline" | "ghost" | "separated";
    className?: string;
    classNames?: AccordionClassNames;
}

/** Multi-select accordion (multiple items open simultaneously) */
export interface AccordionMultiProps {
    type: "multiple";
    items: AccordionItemDef[];
    value?: string[];
    onValueChange?: (value: string[]) => void;
    defaultValue?: string[];
    variant?: "default" | "outline" | "ghost" | "separated";
    className?: string;
    classNames?: AccordionClassNames;
}

export type AccordionProps = AccordionSingleProps | AccordionMultiProps;
