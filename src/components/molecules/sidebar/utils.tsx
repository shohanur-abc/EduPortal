"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { DropdownItem } from "@/components/molecules/dropdown";
import type { SidebarNavItem } from "./types";

// ============= HELPERS =============

export function isAnyChildActive(items: SidebarNavItem[], pathname: string): boolean {
    for (const i of items) {
        switch (i.type) {
            case "separator":
            case "custom":
                continue;
            case "group":
            case "collapsible":
                if (isAnyChildActive(i.items, pathname)) return true;
                break;
            case "item":
            case undefined:
                if (i.href && i.href !== "#" && (pathname === i.href || pathname.startsWith(i.href + "/"))) return true;
                break;
        }
    }
    return false;
}

/** Recursively filter nav items by a search string (case-insensitive label match). */
export function filterNavItems(items: SidebarNavItem[], query: string): SidebarNavItem[] {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.reduce<SidebarNavItem[]>((acc, i) => {
        switch (i.type) {
            case "separator":
            case "custom":
                break;
            case "group": {
                const filtered = filterNavItems(i.items, query);
                if (filtered.length > 0) acc.push({ ...i, items: filtered });
                break;
            }
            case "collapsible": {
                const filtered = filterNavItems(i.items, query);
                if (i.label.toLowerCase().includes(q) || filtered.length > 0)
                    acc.push({ ...i, items: filtered, defaultOpen: filtered.length > 0 });
                break;
            }
            case "item":
            case undefined:
                if (i.label.toLowerCase().includes(q)) acc.push(i);
                break;
        }
        return acc;
    }, []);
}

/**
 * Convert a SidebarNavItem to a DropdownItem — recursively for icon/collapsed mode.
 */
export function navItemToDropdownItem(item: SidebarNavItem): DropdownItem {
    switch (item.type) {
        case "separator":
            return { type: "divider", key: item.key };
        case "custom":
            return { type: "custom", children: item.children, key: item.key };
        case "group":
            return {
                type: "group",
                label: item.label,
                items: item.items.map(navItemToDropdownItem),
                key: item.key,
            };
        case "collapsible":
            return {
                type: "submenu",
                label: item.label,
                icon: item.icon,
                badge: item.badge?.toString(),
                items: item.items.map(navItemToDropdownItem),
                key: item.key,
            };
        // leaf item (type: "item" or undefined)
        default: {
            const hasHref = item.href != null && item.href !== "#";
            return {
                type: hasHref ? "link" : "item",
                label: item.label,
                href: hasHref ? item.href : undefined,
                icon: item.icon,
                onClick: item.onClick,
                disabled: item.disabled,
                external: item.external,
                key: item.key,
            } as DropdownItem;
        }
    }
}

// ============= PERSISTENT SCROLL AREA =============

/** ScrollArea with sessionStorage-based scroll position persistence. */
export function PersistentScrollArea({
    children,
    storageKey,
    className,
}: {
    children: React.ReactNode;
    storageKey: string;
    className?: string;
}) {
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const viewport = wrapper.querySelector<HTMLDivElement>('[data-slot="scroll-area-viewport"]');
        if (!viewport) return;
        // Restore
        const saved = sessionStorage.getItem(storageKey);
        if (saved) viewport.scrollTop = Number(saved);
        // Save on scroll
        const onScroll = () => sessionStorage.setItem(storageKey, String(viewport.scrollTop));
        viewport.addEventListener("scroll", onScroll, { passive: true });
        return () => viewport.removeEventListener("scroll", onScroll);
    }, [storageKey]);

    return (
        <div ref={wrapperRef} className={cn("min-h-0 flex-1 contents", className)}>
            <ScrollArea className="min-h-0 flex-1">
                {children}
            </ScrollArea>
        </div>
    );
}
