"use client";

import * as React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
    navMenuContentLayoutVariants,
    navMenuMegaVariants,
    navMenuMegaSectionVariants,
    navMenuLinkVariants,
    navItemBadgeVariants,
    navActionVariants,
} from "./variants";
import type {
    NavMenuProps,
    NavMenuItem as NavMenuItemType,
    NavLinkItem,
    NavGroupItem,
    NavGroupChildItem,
    NavFeaturedItem,
    NavMegaItem,
    NavMegaSection,
    NavActionItem,
} from "./types";

// ─── Re-exports ────────────────────────────────────────────────────────────────

export type {
    NavMenuClassNames,
    NavLinkItem,
    NavGroupItem,
    NavGroupChildItem,
    NavFeaturedItem,
    NavMegaItem,
    NavMegaSection,
    NavSeparator,
    NavSectionHeader,
    NavActionItem,
    NavCustomItem,
    NavMenuItem,
    NavMenuProps,
    NavItemBadge,
} from "./types";

export {
    navMenuContentLayoutVariants,
    navMenuMegaVariants,
    navMenuMegaSectionVariants,
    navMenuLinkVariants,
    navItemBadgeVariants,
    navActionVariants,
} from "./variants";

// ─── ItemBadge ────────────────────────────────────────────────────────────────

function ItemBadge({
    badge,
    className,
}: {
    badge: NonNullable<NavLinkItem["badge"]>;
    className?: string;
}) {
    return (
        <span className={cn(navItemBadgeVariants({ variant: badge.variant ?? "default" }), className)}>
            {badge.label}
        </span>
    );
}

// ─── NavLink ──────────────────────────────────────────────────────────────────

function NavLink({
    item,
    classNames,
}: {
    item: NavLinkItem;
    classNames?: NavMenuProps["classNames"];
}) {
    const Icon = item.icon;
    const state = item.disabled ? "disabled" : item.active ? "active" : "default";

    return (
        <NavigationMenuLink asChild className={cn(classNames?.link)}>
            <Link
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={cn(navMenuLinkVariants({ state }), item.className)}
            >
                {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={item.image}
                        alt={item.label}
                        className="mt-0.5 size-8 shrink-0 rounded object-cover"
                    />
                ) : Icon ? (
                    <div className="mt-0.5 shrink-0">
                        <Icon className="size-4 text-muted-foreground" />
                    </div>
                ) : null}
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-medium leading-none">{item.label}</span>
                        {item.badge && (
                            <ItemBadge badge={item.badge} className={classNames?.badge} />
                        )}
                        {item.shortcut && (
                            <kbd className="ml-auto text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded border border-border">
                                {item.shortcut}
                            </kbd>
                        )}
                    </div>
                    {item.description && (
                        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground leading-snug">
                            {item.description}
                        </p>
                    )}
                </div>
            </Link>
        </NavigationMenuLink>
    );
}

// ─── FeaturedCard ─────────────────────────────────────────────────────────────

function FeaturedCard({
    item,
    classNames,
}: {
    item: NavFeaturedItem;
    classNames?: NavMenuProps["classNames"];
}) {
    const Icon = item.icon;

    return (
        <li className="row-span-3">
            <NavigationMenuLink asChild>
                <Link
                    href={item.href}
                    className={cn(
                        "flex h-full w-full select-none flex-col justify-end rounded-md p-4 no-underline outline-none focus:shadow-md",
                        item.bgClassName ?? "bg-linear-to-b from-muted/50 to-muted",
                        classNames?.featuredCard,
                        item.className
                    )}
                >
                    {item.eyebrow && (
                        <span className="mb-1 text-[11px] font-semibold uppercase tracking-wide opacity-70">
                            {item.eyebrow}
                        </span>
                    )}
                    {Icon && <Icon className="size-6 mb-2" />}
                    <div className="mb-1 text-base font-medium">{item.label}</div>
                    {item.description && (
                        <p className="text-sm leading-tight text-current/70">
                            {item.description}
                        </p>
                    )}
                    {item.cta && (
                        <span className="mt-3 text-xs font-medium underline-offset-2 hover:underline">
                            {item.cta} →
                        </span>
                    )}
                </Link>
            </NavigationMenuLink>
        </li>
    );
}

// ─── GroupChildRenderer ───────────────────────────────────────────────────────

function GroupChildRenderer({
    child,
    index,
    classNames,
}: {
    child: NavGroupChildItem;
    index: number;
    classNames?: NavMenuProps["classNames"];
}) {
    if (child.type === "separator") {
        return (
            <li key={child.key ?? `sep-${index}`} className={cn("col-span-full my-1", classNames?.separator)}>
                <Separator />
            </li>
        );
    }

    if (child.type === "section") {
        const SIcon = child.icon;
        return (
            <li
                key={child.key ?? `sec-${index}`}
                className={cn("col-span-full flex items-center gap-1.5 px-2 pt-2 pb-0.5", classNames?.sectionHeader)}
            >
                {SIcon && <SIcon className="size-3 text-muted-foreground" />}
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {child.label}
                </span>
            </li>
        );
    }

    // default: link
    return (
        <li key={child.key ?? child.href ?? index}>
            <NavLink item={child} classNames={classNames} />
        </li>
    );
}

// ─── MegaSectionColumn ────────────────────────────────────────────────────────

function MegaSectionColumn({
    section,
    index,
    classNames,
}: {
    section: NavMegaSection;
    index: number;
    classNames?: NavMenuProps["classNames"];
}) {
    const SIcon = section.icon;

    return (
        <div key={section.key ?? index} className={cn(navMenuMegaSectionVariants())}>
            {section.title && (
                <div className="flex items-center gap-1.5 px-2 pt-1 pb-0.5">
                    {SIcon && <SIcon className="size-3 text-muted-foreground" />}
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                        {section.title}
                    </span>
                </div>
            )}
            {section.items.map((child, ci) => (
                <div key={"key" in child ? child.key : ci}>
                    {child.type === "separator" ? (
                        <div className="my-1 px-2">
                            <Separator />
                        </div>
                    ) : child.type === "section" ? (
                        <div className="flex items-center gap-1.5 px-2 pt-2 pb-0.5">
                            {child.icon && <child.icon className="size-3 text-muted-foreground" />}
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                {child.label}
                            </span>
                        </div>
                    ) : (
                        <NavLink item={child} classNames={classNames} />
                    )}
                </div>
            ))}
        </div>
    );
}

// ─── NavMenuItemRenderer ──────────────────────────────────────────────────────

function NavMenuItemRenderer({
    item,
    classNames,
}: {
    item: NavMenuItemType;
    classNames?: NavMenuProps["classNames"];
}) {
    const type = item.type ?? "link";

    // ── simple link ──
    if (type === "link") {
        const linkItem = item as NavLinkItem;
        return (
            <NavigationMenuItem className={cn(classNames?.item)}>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), classNames?.link)}>
                    <Link
                        href={linkItem.href}
                        target={linkItem.external ? "_blank" : undefined}
                        rel={linkItem.external ? "noopener noreferrer" : undefined}
                        className={cn(
                            linkItem.disabled && "pointer-events-none opacity-50",
                            "gap-2",
                            linkItem.className
                        )}
                    >
                        {linkItem.icon && <linkItem.icon className="size-4" />}
                        {linkItem.label}
                        {linkItem.badge && <ItemBadge badge={linkItem.badge} className={classNames?.badge} />}
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
        );
    }

    // ── group with dropdown ──
    if (type === "group") {
        const groupItem = item as NavGroupItem;
        const layout = groupItem.layout ?? "list";

        return (
            <NavigationMenuItem className={cn(classNames?.item)}>
                <NavigationMenuTrigger className={cn(classNames?.trigger, groupItem.className)}>
                    {groupItem.icon && <groupItem.icon className="mr-1.5 size-4" />}
                    {groupItem.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className={cn(classNames?.content, groupItem.contentClassName)}>
                    {groupItem.header && (
                        <div className="border-b px-4 py-3">{groupItem.header}</div>
                    )}
                    <ul className={cn(navMenuContentLayoutVariants({ layout }))}>
                        {groupItem.featured && (
                            <FeaturedCard item={groupItem.featured} classNames={classNames} />
                        )}
                        {groupItem.items.map((child, i) => (
                            <GroupChildRenderer
                                key={"key" in child ? child.key : ("href" in child ? child.href : i)}
                                child={child}
                                index={i}
                                classNames={classNames}
                            />
                        ))}
                    </ul>
                    {groupItem.footer && (
                        <div className="border-t bg-muted/30 px-4 py-3">{groupItem.footer}</div>
                    )}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    // ── mega menu ──
    if (type === "mega") {
        const megaItem = item as NavMegaItem;

        return (
            <NavigationMenuItem className={cn(classNames?.item)}>
                <NavigationMenuTrigger className={cn(classNames?.trigger, megaItem.className)}>
                    {megaItem.icon && <megaItem.icon className="mr-1.5 size-4" />}
                    {megaItem.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className={cn(classNames?.content, megaItem.contentClassName)}>
                    {megaItem.header && (
                        <div className="border-b px-4 py-3">{megaItem.header}</div>
                    )}
                    <div className={cn(navMenuMegaVariants({ hasFeatured: !!megaItem.featured }))}>
                        {megaItem.featured && (
                            <div className="w-48 shrink-0 p-2">
                                <ul className="h-full">
                                    <FeaturedCard item={megaItem.featured} classNames={classNames} />
                                </ul>
                            </div>
                        )}
                        <div className={cn("flex flex-1 flex-wrap", megaItem.featured && "border-l")}>
                            {megaItem.sections.map((section, si) => (
                                <MegaSectionColumn
                                    key={section.key ?? si}
                                    section={section}
                                    index={si}
                                    classNames={classNames}
                                />
                            ))}
                        </div>
                    </div>
                    {megaItem.footer && (
                        <div className="border-t bg-muted/30 px-4 py-3">{megaItem.footer}</div>
                    )}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    // ── action button ──
    if (type === "action") {
        const actionItem = item as NavActionItem;
        return (
            <NavigationMenuItem className={cn(classNames?.item)}>
                <button
                    type="button"
                    onClick={actionItem.onClick}
                    disabled={actionItem.disabled}
                    className={cn(
                        navActionVariants({ variant: actionItem.variant ?? "default" }),
                        navigationMenuTriggerStyle(),
                        "cursor-pointer",
                        actionItem.disabled && "pointer-events-none opacity-50",
                        actionItem.variant === "primary" && "h-9",
                        actionItem.className
                    )}
                >
                    {actionItem.icon && <actionItem.icon className="mr-1.5 size-4" />}
                    {actionItem.label}
                </button>
            </NavigationMenuItem>
        );
    }

    // ── custom dropdown ──
    if (type === "custom") {
        const customItem = item;
        if (customItem.type !== "custom") return null;
        return (
            <NavigationMenuItem className={cn(classNames?.item)}>
                <NavigationMenuTrigger
                    className={cn(classNames?.trigger, customItem.triggerClassName, customItem.className)}
                >
                    {customItem.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                    className={cn(classNames?.content, customItem.contentClassName)}
                >
                    {customItem.content}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return null;
}

// ─── NavMenuMolecule ──────────────────────────────────────────────────────────

export function NavMenuMolecule({
    items,
    viewport = true,
    className,
    classNames: cns,
}: NavMenuProps) {
    return (
        <NavigationMenu viewport={viewport} className={cn(cns?.root, className)}>
            <NavigationMenuList className={cn(cns?.list)}>
                {items.map((item, i) => (
                    <NavMenuItemRenderer
                        key={item.key ?? ("label" in item ? item.label : i)}
                        item={item}
                        classNames={cns}
                    />
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

