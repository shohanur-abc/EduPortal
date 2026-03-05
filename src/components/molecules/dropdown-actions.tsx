"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, type LucideIcon } from "lucide-react"

// ============= COMPONENT =============
export function DropdownActions({ label = "Actions", items }: DropdownActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {items.map((item, i) =>
                    item.separator ? (
                        <DropdownMenuSeparator key={`sep-${i}`} />
                    ) : (
                        <DropdownMenuItem
                            key={item.label}
                            onClick={item.onClick}
                            className={item.destructive ? "text-destructive focus:text-destructive" : undefined}
                            disabled={item.disabled}
                        >
                            {item.icon && <item.icon className="mr-2 size-4" />}
                            {item.label}
                        </DropdownMenuItem>
                    )
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// ============= TYPES =============
export interface ActionItem {
    label?: string
    icon?: LucideIcon
    onClick?: () => void
    destructive?: boolean
    disabled?: boolean
    separator?: boolean
}

interface DropdownActionsProps {
    label?: string
    items: ActionItem[]
}
