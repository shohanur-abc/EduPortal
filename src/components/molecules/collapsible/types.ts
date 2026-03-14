import type * as React from "react";
import type { LucideIcon } from "@/lib/icon";

// ============= TYPES =============

export interface CollapsibleClassNames {
    root?: string;
    trigger?: string;
    triggerIcon?: string;
    header?: string;
    title?: string;
    description?: string;
    content?: string;
    contentInner?: string;
}

export interface CollapsibleProps {
    /** Trigger label / title */
    title: React.ReactNode;
    /** Optional description below the title */
    description?: React.ReactNode;
    /** Icon rendered before the title */
    icon?: LucideIcon;
    /** Main body content */
    children: React.ReactNode;
    /** Controlled open state */
    open?: boolean;
    /** Callback when open changes */
    onOpenChange?: (open: boolean) => void;
    /** Default open (uncontrolled) */
    defaultOpen?: boolean;
    /** Disable open/close interaction */
    disabled?: boolean;
    /** Visual variant */
    variant?: "default" | "outline" | "ghost";
    /** Chevron position in trigger */
    chevronSide?: "left" | "right";
    /** Hide the default chevron icon */
    hideChevron?: boolean;
    /** Custom trigger element — replaces the default header */
    trigger?: React.ReactNode;
    /** className on the root */
    className?: string;
    /** Fine-grained class overrides */
    classNames?: CollapsibleClassNames;
}
