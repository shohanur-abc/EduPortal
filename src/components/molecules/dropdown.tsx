"use client"

import * as React from "react"
import Link from "next/link"
import { cva } from "class-variance-authority"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// ============= CVA VARIANTS =============

const dropdownItemVariants = cva(
    "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
    {
        variants: {
            intent: {
                default: "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                destructive:
                    "text-destructive focus:bg-destructive/10 focus:text-destructive data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            },
            inset: {
                true: "pl-8",
                false: "",
            },
        },
        defaultVariants: {
            intent: "default",
            inset: false,
        },
    }
)

// ============= RECURSIVE ITEMS RENDERER =============

function DropdownItems({
    items,
    classNames: cns,
}: {
    items: DropdownItem[]
    classNames?: DropdownClassNames
}) {
    return (
        <>
            {items.map((item, index) => {
                const key = item.key ?? `item-${index}`

                // --- DIVIDER ---
                if (item.type === "divider") {
                    return <DropdownMenuSeparator key={key} className={cn(cns?.separator, item.className)} />
                }

                // --- LABEL ---
                if (item.type === "label") {
                    return (
                        <DropdownMenuLabel
                            key={key}
                            inset={item.inset}
                            className={cn(cns?.label, item.className)}
                        >
                            {item.icon && <item.icon className={cn("mr-2 size-4", cns?.itemIcon)} />}
                            {item.label}
                        </DropdownMenuLabel>
                    )
                }

                // --- GROUP ---
                if (item.type === "group") {
                    return (
                        <DropdownMenuGroup key={key} className={item.className}>
                            {item.label && (
                                <DropdownMenuLabel className={cn(cns?.label, item.labelClassName)}>
                                    {item.label}
                                </DropdownMenuLabel>
                            )}
                            <DropdownItems items={item.items} classNames={cns} />
                        </DropdownMenuGroup>
                    )
                }

                // --- SUBMENU (recursive) ---
                if (item.type === "submenu") {
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
                    )
                }

                // --- CHECKBOX ITEM ---
                if (item.type === "checkbox") {
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
                    )
                }

                // --- RADIO GROUP ---
                if (item.type === "radio-group") {
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
                    )
                }

                // --- LINK ITEM ---
                if (item.type === "link") {
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
                                {item.external && <ChevronRight className="ml-auto size-3 rotate-[-45deg] text-muted-foreground" />}
                            </Link>
                        </DropdownMenuItem>
                    )
                }

                // --- CUSTOM ITEM ---
                if (item.type === "custom") {
                    return (
                        <DropdownMenuItem
                            key={key}
                            disabled={item.disabled}
                            asChild={item.asChild}
                            className={cn(cns?.item, item.className)}
                            onClick={item.onClick}
                        >
                            {item.children}
                        </DropdownMenuItem>
                    )
                }

                // --- DEFAULT: MENU ITEM ---
                const menuItem = item as MenuItemType
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
                )
            })}
        </>
    )
}

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
    modal,
    contentWidth,
    className,
    classNames: cns,
}: DropdownProps) {
    return (
        <DropdownMenu open={open} onOpenChange={onOpenChange} modal={modal}>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent
                align={align}
                side={side}
                sideOffset={sideOffset}
                alignOffset={alignOffset}
                className={cn(contentWidth && `w-[${contentWidth}]`, cns?.content, className)}
            >
                {label && (
                    <DropdownMenuLabel className={cn(cns?.label)}>{label}</DropdownMenuLabel>
                )}
                {label && <DropdownMenuSeparator className={cns?.separator} />}
                <DropdownItems items={items} classNames={cns} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// ============= TYPES =============

/** classNames for every internal element */
export interface DropdownClassNames {
    content?: string
    label?: string
    separator?: string
    item?: string
    itemIcon?: string
    itemDescription?: string
    badge?: string
    subTrigger?: string
    subContent?: string
    checkboxItem?: string
    radioItem?: string
}

// --- Item Types ---

type BaseItem = {
    key?: string
    className?: string
}

export type MenuItemType = BaseItem & {
    type?: "item"
    label: string
    icon?: LucideIcon
    shortcut?: string
    description?: string
    badge?: string
    disabled?: boolean
    destructive?: boolean
    inset?: boolean
    onClick?: () => void
}

export type LinkItemType = BaseItem & {
    type: "link"
    label: string
    href: string
    icon?: LucideIcon
    shortcut?: string
    description?: string
    disabled?: boolean
    destructive?: boolean
    inset?: boolean
    external?: boolean
}

export type DividerType = BaseItem & {
    type: "divider"
}

export type LabelType = BaseItem & {
    type: "label"
    label: string
    icon?: LucideIcon
    inset?: boolean
}

export type GroupType = BaseItem & {
    type: "group"
    label?: string
    labelClassName?: string
    items: DropdownItem[]
}

export type SubmenuType = BaseItem & {
    type: "submenu"
    label: string
    icon?: LucideIcon
    badge?: string
    disabled?: boolean
    destructive?: boolean
    inset?: boolean
    contentClassName?: string
    items: DropdownItem[]
}

export type CheckboxItemType = BaseItem & {
    type: "checkbox"
    label: string
    icon?: LucideIcon
    shortcut?: string
    checked?: boolean
    disabled?: boolean
    onCheckedChange?: (checked: boolean) => void
}

export type RadioGroupType = BaseItem & {
    type: "radio-group"
    label?: string
    labelClassName?: string
    value?: string
    onValueChange?: (value: string) => void
    options: {
        value: string
        label: string
        icon?: LucideIcon
        shortcut?: string
        disabled?: boolean
        className?: string
    }[]
}

export type CustomItemType = BaseItem & {
    type: "custom"
    children: React.ReactNode
    disabled?: boolean
    asChild?: boolean
    onClick?: () => void
}

export type DropdownItem =
    | MenuItemType
    | LinkItemType
    | DividerType
    | LabelType
    | GroupType
    | SubmenuType
    | CheckboxItemType
    | RadioGroupType
    | CustomItemType

// --- Dropdown Props ---

export interface DropdownProps {
    trigger: React.ReactNode
    items: DropdownItem[]
    label?: string
    align?: "start" | "center" | "end"
    side?: "top" | "right" | "bottom" | "left"
    sideOffset?: number
    alignOffset?: number
    open?: boolean
    onOpenChange?: (open: boolean) => void
    modal?: boolean
    /** CSS width value e.g. "14rem" */
    contentWidth?: string
    className?: string
    classNames?: DropdownClassNames
}

// ============= RE-EXPORTS for convenience =============
export { dropdownItemVariants }
