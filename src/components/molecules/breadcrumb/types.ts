import type * as React from "react";
import type { LucideIcon } from "@/lib/icon";

// ============= TYPES =============

export interface BreadcrumbClassNames {
    root?: string;
    list?: string;
    item?: string;
    link?: string;
    page?: string;
    separator?: string;
    ellipsis?: string;
}

export type BreadcrumbItemType = {
    /** Display label */
    label: React.ReactNode;
    /** Link href — omit for the current page (last item) */
    href?: string;
    /** Icon before the label */
    icon?: LucideIcon;
    /** Disabled state */
    disabled?: boolean;
    /** Additional className */
    className?: string;
};

export interface BreadcrumbProps {
    /** Ordered breadcrumb items (last = current page) */
    items: BreadcrumbItemType[];
    /** Custom separator element */
    separator?: React.ReactNode;
    /** Collapse middle items into an ellipsis when count exceeds this */
    maxItems?: number;
    /** Number of items to always show at the start */
    itemsBeforeCollapse?: number;
    /** Number of items to always show at the end */
    itemsAfterCollapse?: number;
    /** Callback when ellipsis is clicked */
    onEllipsisClick?: () => void;
    /** Ellipsis menu items (renders as a dropdown) */
    ellipsisItems?: BreadcrumbItemType[];
    /** Additional className */
    className?: string;
    /** ClassNames for internal elements */
    classNames?: BreadcrumbClassNames;
}
