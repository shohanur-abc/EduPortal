"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface InfiniteScrollProps {
    /** Whether there are more items to load */
    hasMore: boolean
    /** Whether a page is currently being fetched */
    isLoading: boolean
    /** Callback fired when the sentinel becomes visible */
    onLoadMore: () => void
    /** Total item count (shown in "all loaded" message) */
    total?: number
    /** IntersectionObserver rootMargin (default: "200px") */
    rootMargin?: string
    /** Custom loading element */
    loadingContent?: React.ReactNode
    /** Custom end-of-list element */
    endContent?: React.ReactNode
    /** The scrollable list items */
    children: React.ReactNode
    className?: string
}

/**
 * Reusable infinite scroll wrapper.
 * Renders children followed by a sentinel element that triggers `onLoadMore`
 * when it enters the viewport via IntersectionObserver.
 *
 * @example
 * ```tsx
 * <InfiniteScroll hasMore={hasMore} isLoading={loading} onLoadMore={loadMore} total={total}>
 *   {items.map(item => <Card key={item.id} />)}
 * </InfiniteScroll>
 * ```
 */
export function InfiniteScroll({
    hasMore,
    isLoading,
    onLoadMore,
    total,
    rootMargin = "200px",
    loadingContent,
    endContent,
    children,
    className,
}: InfiniteScrollProps) {
    const sentinelRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const el = sentinelRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    onLoadMore()
                }
            },
            { rootMargin },
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [hasMore, isLoading, onLoadMore, rootMargin])

    return (
        <div className={cn("space-y-3", className)}>
            {children}

            {/* Sentinel element */}
            <div ref={sentinelRef} className="flex justify-center py-4">
                {isLoading && (
                    loadingContent ?? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="size-4 animate-spin" />
                            Loading more...
                        </div>
                    )
                )}
                {!hasMore && !isLoading && total != null && total > 0 && (
                    endContent ?? (
                        <p className="text-xs text-muted-foreground">
                            All {total} items loaded
                        </p>
                    )
                )}
            </div>
        </div>
    )
}
