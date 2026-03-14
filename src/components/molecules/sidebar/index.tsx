"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar, } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { NavRenderer } from "./nav";
import { PersistentScrollArea, filterNavItems } from "./utils";
import type { SidebarPanelProps, SidebarLayoutProps } from "./types";

export type { SidebarClassNames, SidebarNavLeaf, SidebarNavGroup, SidebarNavCollapsible, SidebarNavSeparator, SidebarNavCustom, SidebarNavItem, SidebarSearchConfig, SidebarPanelProps, SidebarLayoutProps, SidebarBrandProps, SidebarUserProps, } from "./types";
export { filterNavItems } from "./utils";
export { SidebarBrand, SidebarUser, SidebarInsetHeader } from "./slots";
export { SidebarTrigger, useSidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton };

// ============= CVA =============

const sidebarMenuButtonVariants = cva(
    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
    {
        variants: {
            active: {
                true: "bg-sidebar-accent text-sidebar-accent-foreground",
                false: "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
            },
        },
        defaultVariants: { active: false },
    }
);

export { sidebarMenuButtonVariants };

// ============= SIDEBAR PANEL =============
// Just the <Sidebar> content — no provider/inset. For embedding in existing layouts.

export function SidebarPanel({
    header,
    nav,
    footer,
    search,
    rail = false,
    scrollable = true,
    persistScrollKey,
    variant,
    side,
    collapsible,
    className,
    classNames: cns,
    loading = false,
    skeletonCount = 5,
    ...props
}: SidebarPanelProps & React.ComponentProps<typeof Sidebar>) {
    const displayNav = (search?.value && search.autoFilter !== false)
        ? filterNavItems(nav, search.value)
        : nav;

    return (
        <Sidebar
            variant={variant}
            side={side}
            collapsible={collapsible}
            className={cn(cns?.sidebar, className)}
            {...props}
        >
            {/* HEADER */}
            {header && (
                <SidebarHeader className={cn(cns?.header)}>
                    {header}
                </SidebarHeader>
            )}

            {/* CONTENT */}
            <SidebarContent className={cn(scrollable && "overflow-hidden", cns?.content)}>
                {/* SEARCH */}
                {search && (
                    <SidebarGroup className="pb-0">
                        <SidebarGroupContent>
                            <SidebarInput
                                placeholder={search.placeholder ?? "Search…"}
                                value={search.value}
                                onChange={search.onChange ? (e) => search.onChange!(e.target.value) : undefined}
                                className={cn(cns?.search, search.className)}
                            />
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}

                {/* NAV */}
                {(() => {
                    const navContent = loading
                        ? Array.from({ length: skeletonCount }).map((_, i) => (
                            <SidebarGroup key={i}>
                                <SidebarMenu>
                                    <SidebarMenuSkeleton showIcon />
                                </SidebarMenu>
                            </SidebarGroup>
                        ))
                        : displayNav.length === 0 && search?.value
                            ? (
                                <SidebarGroup>
                                    <SidebarGroupContent>
                                        <p className="px-2 py-6 text-center text-xs text-sidebar-foreground/50">
                                            No results for &ldquo;{search.value}&rdquo;
                                        </p>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            )
                            : displayNav.map((section, i) => {
                                switch (section.type) {
                                    case "separator":
                                        return <SidebarSeparator key={section.key ?? i} className={cn(cns?.separator, section.className)} />;

                                    case "custom":
                                        return <React.Fragment key={section.key ?? i}>{section.children}</React.Fragment>;

                                    case "group":
                                        return (
                                            <SidebarGroup key={section.key ?? i} className={cn(cns?.group, section.className)}>
                                                {section.label && (
                                                    <SidebarGroupLabel className={cn(cns?.groupLabel, section.labelClassName)}>
                                                        {section.labelIcon && <section.labelIcon className="mr-1.5 size-3.5" />}
                                                        {section.label}
                                                    </SidebarGroupLabel>
                                                )}
                                                {section.action && (
                                                    <SidebarGroupAction title={section.actionTitle} onClick={section.action}>
                                                        {section.actionIcon ? <section.actionIcon className="size-4" /> : <span>+</span>}
                                                    </SidebarGroupAction>
                                                )}
                                                <SidebarGroupContent>
                                                    <NavRenderer items={section.items} depth={0} classNames={cns} />
                                                </SidebarGroupContent>
                                            </SidebarGroup>
                                        );
                                    default:
                                        return (
                                            <SidebarGroup key={section.key ?? i}>
                                                <SidebarGroupContent>
                                                    <NavRenderer items={[section]} depth={0} classNames={cns} />
                                                </SidebarGroupContent>
                                            </SidebarGroup>
                                        );
                                }
                            });

                    return scrollable
                        ? persistScrollKey
                            ? <PersistentScrollArea storageKey={persistScrollKey}>{navContent}</PersistentScrollArea>
                            : <ScrollArea className="min-h-0 flex-1">{navContent}</ScrollArea>
                        : <>{navContent}</>;
                })()}
            </SidebarContent>

            {/* FOOTER */}
            {footer && (
                <SidebarFooter className={cn(cns?.footer)}>
                    {footer}
                </SidebarFooter>
            )}

            {rail && <SidebarRail />}
        </Sidebar>
    );
}

// ============= FULL LAYOUT =============
// SidebarProvider + SidebarPanel + SidebarInset — the most common full-page pattern.

export function SidebarLayout({
    children,
    defaultOpen,
    open,
    onOpenChange,
    className,
    classNames: cns,
    insetClassName,
    topbar,
    providerStyle,
    ...panelProps
}: SidebarLayoutProps) {
    return (
        <SidebarProvider
            defaultOpen={defaultOpen}
            open={open}
            onOpenChange={onOpenChange}
            className={cn(cns?.provider, className)}
            style={providerStyle}
        >
            <SidebarPanel classNames={cns} {...panelProps} />
            <SidebarInset className={cn(cns?.inset, insetClassName)}>
                {topbar !== undefined && topbar}
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
