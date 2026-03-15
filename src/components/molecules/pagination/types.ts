import type * as React from "react";

// ============= TYPES =============

export interface PaginationClassNames {
    root?: string;
    content?: string;
    item?: string;
    link?: string;
    activeLink?: string;
    previous?: string;
    next?: string;
    ellipsis?: string;
}

export type PaginationSize = "sm" | "default" | "lg";
export type PaginationVariant = "default" | "outline" | "ghost";

export interface PaginationProps {
    /** Total number of pages */
    totalPages: number;
    /** Current active page (1-indexed) */
    currentPage: number;
    /** Callback when page changes */
    onPageChange?: (page: number) => void;
    /** Number of sibling pages to show around the current page */
    siblingCount?: number;
    /** Show previous/next buttons */
    showPrevNext?: boolean;
    /** Previous button text */
    previousText?: string;
    /** Next button text */
    nextText?: string;
    /** Show first/last page buttons */
    showFirstLast?: boolean;
    /** Disable all navigation */
    disabled?: boolean;
    /** Build href for each page (for link-based pagination) */
    buildHref?: (page: number) => string;
    /** Additional className */
    className?: string;
    /** ClassNames for internal elements */
    classNames?: PaginationClassNames;
}
