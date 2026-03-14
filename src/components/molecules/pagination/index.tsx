"use client";

import * as React from "react";

import {
    Pagination as PaginationRoot,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import type { PaginationProps } from "./types";

export type { PaginationClassNames, PaginationProps } from "./types";
export { paginationItemVariants } from "./variants";

// ============= HELPERS =============

function generatePageRange(
    currentPage: number,
    totalPages: number,
    siblingCount: number
): (number | "ellipsis-start" | "ellipsis-end")[] {
    const totalPageNumbers = siblingCount * 2 + 5; // siblings + first + last + current + 2 ellipses

    // If total pages fit without ellipsis
    if (totalPages <= totalPageNumbers) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    if (!showLeftEllipsis && showRightEllipsis) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
        return [...leftRange, "ellipsis-end", totalPages];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = Array.from(
            { length: rightItemCount },
            (_, i) => totalPages - rightItemCount + i + 1
        );
        return [1, "ellipsis-start", ...rightRange];
    }

    const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
    );
    return [1, "ellipsis-start", ...middleRange, "ellipsis-end", totalPages];
}

// ============= MAIN COMPONENT =============

export function PaginationMolecule({
    totalPages,
    currentPage,
    onPageChange,
    siblingCount = 1,
    showPrevNext = true,
    previousText,
    nextText,
    showFirstLast = false,
    disabled = false,
    buildHref,
    className,
    classNames: cns,
}: PaginationProps) {
    const pages = generatePageRange(currentPage, totalPages, siblingCount);

    const handlePageClick = (page: number) => (e: React.MouseEvent) => {
        if (!buildHref) {
            e.preventDefault();
        }
        onPageChange?.(page);
    };

    const getHref = (page: number) => buildHref?.(page) ?? "#";

    return (
        <PaginationRoot className={cn(cns?.root, className)}>
            <PaginationContent className={cn(cns?.content)}>
                {/* First page */}
                {showFirstLast && currentPage > 1 && (
                    <PaginationItem className={cn(cns?.item)}>
                        <PaginationLink
                            href={getHref(1)}
                            onClick={handlePageClick(1)}
                            className={cn(disabled && "pointer-events-none opacity-50", cns?.link)}
                        >
                            1
                        </PaginationLink>
                    </PaginationItem>
                )}

                {/* Previous */}
                {showPrevNext && (
                    <PaginationItem className={cn(cns?.item)}>
                        <PaginationPrevious
                            href={getHref(Math.max(1, currentPage - 1))}
                            onClick={handlePageClick(Math.max(1, currentPage - 1))}
                            className={cn(
                                (currentPage <= 1 || disabled) && "pointer-events-none opacity-50",
                                cns?.previous
                            )}
                        />
                    </PaginationItem>
                )}

                {/* Page numbers */}
                {pages.map((page, i) => {
                    if (page === "ellipsis-start" || page === "ellipsis-end") {
                        return (
                            <PaginationItem key={`${page}-${i}`} className={cn(cns?.item)}>
                                <PaginationEllipsis className={cn(cns?.ellipsis)} />
                            </PaginationItem>
                        );
                    }

                    const isActive = page === currentPage;
                    return (
                        <PaginationItem key={page} className={cn(cns?.item)}>
                            <PaginationLink
                                href={getHref(page)}
                                isActive={isActive}
                                onClick={handlePageClick(page)}
                                className={cn(
                                    disabled && "pointer-events-none opacity-50",
                                    isActive ? cns?.activeLink : cns?.link
                                )}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {/* Next */}
                {showPrevNext && (
                    <PaginationItem className={cn(cns?.item)}>
                        <PaginationNext
                            href={getHref(Math.min(totalPages, currentPage + 1))}
                            onClick={handlePageClick(Math.min(totalPages, currentPage + 1))}
                            className={cn(
                                (currentPage >= totalPages || disabled) && "pointer-events-none opacity-50",
                                cns?.next
                            )}
                        />
                    </PaginationItem>
                )}

                {/* Last page */}
                {showFirstLast && currentPage < totalPages && (
                    <PaginationItem className={cn(cns?.item)}>
                        <PaginationLink
                            href={getHref(totalPages)}
                            onClick={handlePageClick(totalPages)}
                            className={cn(disabled && "pointer-events-none opacity-50", cns?.link)}
                        >
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                )}
            </PaginationContent>
        </PaginationRoot>
    );
}
