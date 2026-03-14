"use client";

import * as React from "react";
import Link from "next/link";
import { MoreHorizontal } from "@/lib/icon";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar, } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dropdown } from "@/components/molecules/dropdown";
import { cn } from "@/lib/utils";
import type { SidebarBrandProps, SidebarUserProps } from "./types";

// ============= READY-MADE HEADER SLOTS =============

/** Brand logo + optional subtitle in sidebar header */
export function SidebarBrand({
    logo,
    name,
    subtitle,
    href = "#",
    className,
}: SidebarBrandProps) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                    <Link href={href} className={cn("gap-3", className)}>
                        {logo && (
                            <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                {React.isValidElement(logo)
                                    ? logo
                                    : React.createElement(logo as React.ElementType, { className: "size-4" })}
                            </div>
                        )}
                        <div className="flex flex-col gap-0.5 leading-none">
                            <span className="font-semibold">{name}</span>
                            {subtitle && <span className="text-xs text-sidebar-foreground/60">{subtitle}</span>}
                        </div>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

/** User profile in sidebar footer with optional dropdown actions */
export function SidebarUser({
    name,
    email,
    avatar,
    avatarFallback,
    actions,
    className,
}: SidebarUserProps) {
    const { isMobile } = useSidebar();

    const inner = (
        <div className={cn("flex items-center gap-2 px-1 py-1.5", className)}>
            <Avatar className="size-8 rounded-lg">
                {avatar && <AvatarImage src={avatar} alt={name} />}
                <AvatarFallback className="rounded-lg">
                    {avatarFallback ?? name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold truncate">{name}</span>
                {email && <span className="text-xs text-muted-foreground truncate">{email}</span>}
            </div>
        </div>
    );

    if (!actions?.length) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>{inner}</SidebarMenuItem>
            </SidebarMenu>
        );
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <Dropdown
                    trigger={
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="size-8 rounded-lg">
                                {avatar && <AvatarImage src={avatar} alt={name} />}
                                <AvatarFallback className="rounded-lg">
                                    {avatarFallback ?? name?.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col leading-tight text-left">
                                <span className="text-sm font-semibold truncate">{name}</span>
                                {email && <span className="text-xs text-muted-foreground truncate">{email}</span>}
                            </div>
                            <MoreHorizontal className="ml-auto size-4 shrink-0" />
                        </SidebarMenuButton>
                    }
                    items={actions}
                    side={isMobile ? "bottom" : "right"}
                    align="end"
                />
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

/** Inline default trigger bar for SidebarInset headers */
export function SidebarInsetHeader({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <header className={cn("flex h-14 shrink-0 items-center gap-2 border-b px-4", className)}>
            <SidebarTrigger className="-ml-1" />
            {children}
        </header>
    );
}
