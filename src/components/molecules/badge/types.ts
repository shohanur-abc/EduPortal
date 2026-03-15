import type * as React from "react";
import type { LucideIcon } from "@/lib/icon";

// ============= TYPES =============

export interface BadgeClassNames {
    root?: string;
    icon?: string;
    label?: string;
    dot?: string;
    dismiss?: string;
}

export interface BadgeGroupClassNames {
    root?: string;
    badge?: string;
    overflow?: string;
}

export type BadgeVariant =
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";

export type BadgeSize = "sm" | "default" | "lg";

export interface BadgeProps {
    /** Badge label text */
    label?: React.ReactNode;
    /** Icon rendered before/after the label */
    icon?: LucideIcon;
    /** Icon position */
    iconPosition?: "start" | "end";
    /** Visual variant */
    variant?: BadgeVariant;
    /** Badge size */
    size?: BadgeSize;
    /** Show a status dot */
    dot?: boolean;
    /** Dot color (tailwind class or css color) */
    dotColor?: string;
    /** Render as a pill/counter badge (circular when single char) */
    pill?: boolean;
    /** Make the badge dismissible */
    dismissible?: boolean;
    /** Callback when dismiss is clicked */
    onDismiss?: () => void;
    /** Render as a link */
    href?: string;
    /** External link */
    external?: boolean;
    /** Click handler */
    onClick?: () => void;
    /** Disabled state */
    disabled?: boolean;
    /** Accessible label */
    ariaLabel?: string;
    /** Additional className */
    className?: string;
    /** ClassNames for internal elements */
    classNames?: BadgeClassNames;
    /** Children override (renders instead of label) */
    children?: React.ReactNode;
}

// --- Badge Group ---

export interface BadgeGroupProps {
    /** Array of badge definitions */
    badges: BadgeProps[];
    /** Maximum visible badges before overflow */
    max?: number;
    /** Overflow badge variant */
    overflowVariant?: BadgeVariant;
    /** Badge size for all badges */
    size?: BadgeSize;
    /** Gap between badges */
    gap?: "sm" | "default" | "lg";
    /** Additional className */
    className?: string;
    /** ClassNames for internal elements */
    classNames?: BadgeGroupClassNames;
}
