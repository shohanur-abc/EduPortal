"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { DropdownMenuCheckboxItem, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { dropdownItemVariants } from "./variants";
import type { DropdownItem, DropdownClassNames, MenuItemType } from "./types";

// ============= RECURSIVE ITEMS RENDERER =============

export function DropdownItems({
    items,
    classNames: cns,
}: {
    items: DropdownItem[];
    classNames?: DropdownClassNames;
}) {
    return (
        <>
            {items.map((item, index) => {
                const key = item.key ?? `item-${index}`;

                switch (item.type) {
                    // --- DIVIDER ---
                    case "divider":
                        return <DropdownMenuSeparator key={key} className={cn(cns?.separator, item.className)} />;

                    // --- LABEL ---
                    case "label":
                        return (
                            <DropdownMenuLabel
                                key={key}
                                inset={item.inset}
                                className={cn(cns?.label, item.className)}
                            >
                                {item.icon && <item.icon className={cn("mr-2 size-4", cns?.itemIcon)} />}
                                {item.label}
                            </DropdownMenuLabel>
                        );

                    // --- GROUP ---
                    case "group":
                        return (
                            <DropdownMenuGroup key={key} className={item.className}>
                                {item.label && (
                                    <DropdownMenuLabel className={cn(cns?.label, item.labelClassName)}>
                                        {item.label}
                                    </DropdownMenuLabel>
                                )}
                                <DropdownItems items={item.items} classNames={cns} />
                            </DropdownMenuGroup>
                        );

                    // --- SUBMENU (recursive) ---
                    case "submenu":
                        return (
                            <DropdownMenuSub key={key}>
                                <DropdownMenuSubTrigger
                                    disabled={item.disabled}
                                    inset={item.inset}
                                    className={cn(
                                        dropdownItemVariants({ intent: item.destructive ? "destructive" : "default", inset: item.inset }),
                                        cns?.subTrigger,
                                        item.className
                                    )}
                                >
                                    {item.icon && <item.icon className={cn("size-4", cns?.itemIcon)} />}
                                    <span>{item.label}</span>
                                    {item.badge && (
                                        <span className={cn("ml-auto text-xs text-muted-foreground", cns?.badge)}>
                                            {item.badge}
                                        </span>
                                    )}
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent
                                        className={cn(cns?.subContent, item.contentClassName)}
                                    >
                                        <DropdownItems items={item.items} classNames={cns} />
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        );

                    // --- CHECKBOX ITEM ---
                    case "checkbox":
                        return (
                            <DropdownMenuCheckboxItem
                                key={key}
                                checked={item.checked}
                                onCheckedChange={item.onCheckedChange}
                                disabled={item.disabled}
                                className={cn(cns?.checkboxItem, item.className)}
                            >
                                {item.icon && <item.icon className={cn("mr-2 size-4", cns?.itemIcon)} />}
                                {item.label}
                                {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
                            </DropdownMenuCheckboxItem>
                        );

                    // --- RADIO GROUP ---
                    case "radio-group":
                        return (
                            <DropdownMenuRadioGroup
                                key={key}
                                value={item.value}
                                onValueChange={item.onValueChange}
                                className={item.className}
                            >
                                {item.label && (
                                    <DropdownMenuLabel className={cn(cns?.label, item.labelClassName)}>
                                        {item.label}
                                    </DropdownMenuLabel>
                                )}
                                {item.options.map((opt, oi) => (
                                    <DropdownMenuRadioItem
                                        key={opt.value ?? `radio-${oi}`}
                                        value={opt.value}
                                        disabled={opt.disabled}
                                        className={cn(cns?.radioItem, opt.className)}
                                    >
                                        {opt.icon && <opt.icon className={cn("mr-2 size-4", cns?.itemIcon)} />}
                                        {opt.label}
                                        {opt.shortcut && <DropdownMenuShortcut>{opt.shortcut}</DropdownMenuShortcut>}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        );

                    // --- LINK ITEM ---
                    case "link":
                        return (
                            <DropdownMenuItem
                                key={key}
                                disabled={item.disabled}
                                asChild
                                className={cn(
                                    dropdownItemVariants({
                                        intent: item.destructive ? "destructive" : "default",
                                        inset: item.inset,
                                    }),
                                    cns?.item,
                                    item.className
                                )}
                            >
                                <Link
                                    href={item.href}
                                    target={item.external ? "_blank" : undefined}
                                    rel={item.external ? "noopener noreferrer" : undefined}
                                >
                                    {item.icon && <item.icon className={cn("size-4", cns?.itemIcon)} />}
                                    <span className="flex-1">{item.label}</span>
                                    {item.description && (
                                        <span className={cn("ml-2 text-xs text-muted-foreground truncate max-w-24", cns?.itemDescription)}>
                                            {item.description}
                                        </span>
                                    )}
                                    {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
                                    {item.external && <ChevronRight className="ml-auto size-3 -rotate-45 text-muted-foreground" />}
                                    {item.badge && (
                                        <span className={cn("ml-auto text-xs text-muted-foreground", cns?.badge)}>
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            </DropdownMenuItem>
                        );

                    // --- CUSTOM ITEM ---
                    case "custom":
                        return (
                            <DropdownMenuItem
                                key={key}
                                disabled={item.disabled}
                                asChild={item.asChild}
                                className={cn(cns?.item, item.className)}
                                onClick={item.onClick}
                                onSelect={item.preventClose ? (e) => e.preventDefault() : undefined}
                            >
                                {item.children}
                            </DropdownMenuItem>
                        );

                    // --- DEFAULT: MENU ITEM ---
                    default: {
                        const menuItem = item as MenuItemType;
                        return (
                            <DropdownMenuItem
                                key={key}
                                disabled={menuItem.disabled}
                                onClick={menuItem.onClick}
                                className={cn(
                                    dropdownItemVariants({
                                        intent: menuItem.destructive ? "destructive" : "default",
                                        inset: menuItem.inset,
                                    }),
                                    cns?.item,
                                    menuItem.className
                                )}
                            >
                                {menuItem.icon && <menuItem.icon className={cn("size-4", cns?.itemIcon)} />}
                                <span className="flex-1">{menuItem.label}</span>
                                {menuItem.description && (
                                    <span className={cn("ml-2 text-xs text-muted-foreground truncate max-w-24", cns?.itemDescription)}>
                                        {menuItem.description}
                                    </span>
                                )}
                                {menuItem.badge && (
                                    <span className={cn("ml-auto rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium", cns?.badge)}>
                                        {menuItem.badge}
                                    </span>
                                )}
                                {menuItem.shortcut && <DropdownMenuShortcut>{menuItem.shortcut}</DropdownMenuShortcut>}
                            </DropdownMenuItem>
                        );
                    }
                }
            })}
        </>
    );
}
