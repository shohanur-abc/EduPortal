"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, MoreHorizontal } from "@/lib/icon";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarSeparator, useSidebar, } from "@/components/ui/sidebar";
import { Dropdown } from "@/components/molecules/dropdown";
import { cn } from "@/lib/utils";
import { isAnyChildActive, navItemToDropdownItem } from "./utils";
import type { SidebarNavItem, SidebarClassNames } from "./types";

// ============= RECURSIVE NAV RENDERER =============

export function NavRenderer({
    items,
    depth = 0,
    classNames: cns,
}: {
    items: SidebarNavItem[];
    depth?: number;
    classNames?: SidebarClassNames;
}) {
    if (depth === 0) {
        return (
            <SidebarMenu>
                {items.map((item, i) => (
                    <NavItem key={item.key ?? i} item={item} depth={depth} classNames={cns} />
                ))}
            </SidebarMenu>
        );
    }
    return (
        <SidebarMenuSub>
            {items.map((item, i) => (
                <NavItem key={item.key ?? i} item={item} depth={depth} classNames={cns} />
            ))}
        </SidebarMenuSub>
    );
}

export function NavItem({
    item,
    depth,
    classNames: cns,
}: {
    item: SidebarNavItem;
    depth: number;
    classNames?: SidebarClassNames;
}) {
    const pathname = usePathname();
    const { state: sidebarState } = useSidebar();

    switch (item.type) {
        // SEPARATOR
        case "separator":
            return <SidebarSeparator className={cn(cns?.separator, item.className)} />;

        // CUSTOM
        case "custom":
            return <>{item.children}</>;

        // GROUP
        case "group":
            return (
                <SidebarGroup className={cn(cns?.group, item.className)}>
                    {item.label && (
                        <SidebarGroupLabel className={cn(cns?.groupLabel, item.labelClassName)}>
                            {item.labelIcon && <item.labelIcon className="mr-1.5 size-3.5" />}
                            {item.label}
                        </SidebarGroupLabel>
                    )}
                    {item.action && (
                        <SidebarGroupAction title={item.actionTitle} onClick={item.action}>
                            {item.actionIcon ? <item.actionIcon className="size-4" /> : <span>+</span>}
                        </SidebarGroupAction>
                    )}
                    <SidebarGroupContent>
                        <NavRenderer items={item.items} depth={depth} classNames={cns} />
                    </SidebarGroupContent>
                </SidebarGroup>
            );

        // COLLAPSIBLE
        case "collapsible": {
            const childActive = isAnyChildActive(item.items, pathname);
            if (depth === 0) {
                const isIconMode = sidebarState === "collapsed";

                // Icon/collapsed mode: show Dropdown popover with sub-items
                if (isIconMode) {
                    return (
                        <SidebarMenuItem>
                            <Dropdown
                                trigger={
                                    <SidebarMenuButton
                                        tooltip={item.label}
                                        isActive={item.active ?? childActive}
                                        className={cn(cns?.menuButton)}
                                    >
                                        {item.icon && <item.icon className={cn("size-4", cns?.itemIcon)} />}
                                        <span>{item.label}</span>
                                    </SidebarMenuButton>
                                }
                                items={item.items.map(navItemToDropdownItem)}
                                align="start"
                                side="right"
                            />
                        </SidebarMenuItem>
                    );
                }

                // Expanded mode: normal collapsible
                return (
                    <Collapsible
                        asChild
                        defaultOpen={item.defaultOpen ?? childActive}
                        className={cn("group/collapsible", item.className)}
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton
                                    tooltip={item.label}
                                    isActive={item.active ?? childActive}
                                    className={cn(cns?.menuButton)}
                                >
                                    {item.icon && <item.icon className={cn("size-4", cns?.itemIcon)} />}
                                    <span>{item.label}</span>
                                    {item.badge != null && (
                                        <span className={cn(
                                            "ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
                                            "bg-sidebar-primary/10 text-sidebar-foreground",
                                            "peer-data-[active=true]/menu-button:bg-sidebar-accent peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
                                            cns?.badge
                                        )}>
                                            {item.badge}
                                        </span>
                                    )}
                                    <ChevronRight
                                        className={cn(
                                            "ml-1 size-4 shrink-0 transition-transform duration-200",
                                            item.badge == null && "ml-auto",
                                            "group-data-[state=open]/collapsible:rotate-90",
                                            cns?.chevron
                                        )}
                                    />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <NavRenderer items={item.items} depth={depth + 1} classNames={cns} />
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                );
            }

            // nested collapsible (depth > 0)
            return (
                <Collapsible
                    asChild
                    defaultOpen={item.defaultOpen ?? childActive}
                    className={cn("group/collapsible-sub", item.className)}
                >
                    <SidebarMenuSubItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuSubButton
                                isActive={item.active ?? childActive}
                                className={cn(cns?.subButton)}
                            >
                                {item.icon && <item.icon className={cn("size-4", cns?.itemIcon)} />}
                                <span>{item.label}</span>
                                <ChevronRight
                                    className={cn(
                                        "ml-auto size-3.5 shrink-0 transition-transform duration-200",
                                        "group-data-[state=open]/collapsible-sub:rotate-90",
                                        cns?.chevron
                                    )}
                                />
                            </SidebarMenuSubButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <NavRenderer items={item.items} depth={depth + 1} classNames={cns} />
                        </CollapsibleContent>
                    </SidebarMenuSubItem>
                </Collapsible>
            );
        }

        // LEAF ITEM — default
        default: {
            if (depth === 0) {
                const effectiveActive = item.active ?? (
                    item.href != null && item.href !== "#" && (pathname === item.href || pathname.startsWith(item.href + "/"))
                );
                const Btn = item.href ? (
                    <SidebarMenuButton
                        asChild
                        tooltip={item.tooltip ?? item.label}
                        isActive={effectiveActive}
                        className={cn(cns?.menuButton, item.className)}
                    >
                        <Link
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            onClick={item.onClick}
                        >
                            {item.icon && <item.icon className={cn("size-4", cns?.itemIcon)} />}
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                ) : (
                    <SidebarMenuButton
                        tooltip={item.tooltip ?? item.label}
                        isActive={effectiveActive}
                        disabled={item.disabled}
                        onClick={item.onClick}
                        className={cn(cns?.menuButton, item.className)}
                    >
                        {item.icon && <item.icon className={cn("size-4", cns?.itemIcon)} />}
                        <span>{item.label}</span>
                    </SidebarMenuButton>
                );

                return (
                    <SidebarMenuItem className={item.wrapperClassName}>
                        {Btn}
                        {item.badge != null && (
                            <SidebarMenuBadge className={cns?.badge}>{item.badge}</SidebarMenuBadge>
                        )}
                        {item.actions && item.actions.length > 0 && (
                            <Dropdown
                                trigger={
                                    <SidebarMenuAction showOnHover className={cn(cns?.menuAction)}>
                                        <MoreHorizontal className="size-4" />
                                        <span className="sr-only">More</span>
                                    </SidebarMenuAction>
                                }
                                items={item.actions}
                                align="start"
                                side="right"
                            />
                        )}
                    </SidebarMenuItem>
                );
            }

            // LEAF ITEM — depth > 0 (sub-item)
            const effectiveSubActive = item.active ?? (
                item.href != null && item.href !== "#" && (pathname === item.href || pathname.startsWith(item.href + "/"))
            );
            const subBadge = item.badge != null ? (
                <span className={cn(
                    "ml-auto flex h-4 min-w-4 shrink-0 items-center justify-center rounded px-1 text-[10px] font-medium tabular-nums select-none",
                    "bg-sidebar-primary/10 text-sidebar-foreground",
                    "group-data-[collapsible=icon]:hidden",
                    cns?.badge
                )}>
                    {item.badge}
                </span>
            ) : null;
            return (
                <SidebarMenuSubItem className={item.wrapperClassName}>
                    {item.href ? (
                        <SidebarMenuSubButton
                            asChild
                            isActive={effectiveSubActive}
                            className={cn(cns?.subButton, item.className)}
                        >
                            <Link
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                onClick={item.onClick}
                            >
                                {item.icon && <item.icon className={cn("size-3.5", cns?.itemIcon)} />}
                                <span>{item.label}</span>
                                {subBadge}
                            </Link>
                        </SidebarMenuSubButton>
                    ) : (
                        <SidebarMenuSubButton
                            isActive={effectiveSubActive}
                            aria-disabled={item.disabled}
                            onClick={item.onClick}
                            className={cn(cns?.subButton, item.className)}
                        >
                            {item.icon && <item.icon className={cn("size-3.5", cns?.itemIcon)} />}
                            <span>{item.label}</span>
                            {subBadge}
                        </SidebarMenuSubButton>
                    )}
                </SidebarMenuSubItem>
            );
        }
    }
}
