import type * as React from "react";
import type { LucideIcon } from "lucide-react";
import type { Button } from "@/components/ui/button";

// ============= TYPES =============
export type DialogDrawerAction = {
    /** Button label */
    label: string;
    onClick?: () => void;
    variant?: React.ComponentProps<typeof Button>["variant"];
    size?: React.ComponentProps<typeof Button>["size"];
    disabled?: boolean;
    /** Show spinner on this button (overrides global `loading` on last action) */
    loading?: boolean;
    icon?: LucideIcon;
    className?: string;
    /** Close the dialog/drawer after clicking */
    closeOnClick?: boolean;
    type?: "button" | "submit" | "reset";
};

export interface DialogDrawerClassNames {
    container?: string;
    header?: string;
    icon?: string;
    title?: string;
    description?: string;
    body?: string;
    footer?: string;
    closeButton?: string;
    action?: string;
}

export interface DialogDrawerProps {
    /** The element that opens the dialog/drawer */
    trigger?: React.ReactNode;
    /** Dialog/drawer title */
    title?: string;
    /** Dialog/drawer description */
    description?: string | React.ReactNode;
    /** Alignment for the dialog/drawer content */
    align?: "left" | "center" | "right";
    /** Main content */
    children?: React.ReactNode;
    /** Footer content (takes precedence over `actions`) */
    footer?: React.ReactNode;
    /** Shorthand footer action buttons */
    actions?: DialogDrawerAction[];
    /** Optional icon rendered in the header */
    icon?: LucideIcon;
    /** Controlled open state */
    open?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Default open state (uncontrolled) */
    defaultOpen?: boolean;
    /** Body wrapper className */
    className?: string;
    /** Fine-grained classNames for every internal element */
    classNames?: DialogDrawerClassNames;
    /** Prevent auto-closing when clicking outside (dialog only) */
    closeOnOutsideClick?: boolean;
    /** Show global loading overlay and disable actions */
    loading?: boolean;
    /** Make the body content area scrollable */
    scrollable?: boolean;
    /** Show the built-in ✕ close button (dialog only) */
    showCloseButton?: boolean;
    /** Vaul drawer slide-in direction (mobile / forceMode="drawer") */
    drawerDirection?: "top" | "right" | "bottom" | "left";
    /** Override responsive behaviour and force a specific presentation */
    forceMode?: "dialog" | "drawer";
    /** Modal behaviour — set false for a non-blocking overlay */
    modal?: boolean;
}
