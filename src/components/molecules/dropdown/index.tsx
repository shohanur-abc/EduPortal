"use client";

import * as React from "react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DropdownItems } from "./items";
import type { DropdownProps } from "./types";

export type { DropdownClassNames, DropdownItem, DropdownProps, MenuItemType, LinkItemType, DividerType, LabelType, GroupType, SubmenuType, CheckboxItemType, RadioGroupType, CustomItemType, } from "./types";
export { dropdownItemVariants } from "./variants";

// ============= MAIN COMPONENT =============

export function Dropdown({
    trigger,
    items,
    label,
    align = "end",
    side,
    sideOffset,
    alignOffset,
    open,
    onOpenChange,
    defaultOpen,
    modal,
    contentWidth,
    className,
    classNames: cns,
}: DropdownProps) {
    return (
        <DropdownMenu open={open} onOpenChange={onOpenChange} modal={modal} defaultOpen={defaultOpen}>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent
                align={align}
                side={side}
                sideOffset={sideOffset}
                alignOffset={alignOffset}
                style={contentWidth ? { width: contentWidth } : undefined}
                className={cn("w-fit scrollbar-thin", cns?.content, className)}
            >
                {label && (
                    <DropdownMenuLabel className={cn(cns?.label)}>{label}</DropdownMenuLabel>
                )}
                {label && <DropdownMenuSeparator className={cns?.separator} />}
                <DropdownItems items={items} classNames={cns} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
