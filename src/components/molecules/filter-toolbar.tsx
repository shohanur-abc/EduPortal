"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

// ============= COMPONENT =============
export function FilterToolbar({ searchValue, onSearchChange, searchPlaceholder = "Search...", filters = [], className, children }: FilterToolbarProps) {
    return (
        <div className={cn("flex flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap", className)}>
            <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-8"
                />
                {searchValue && (
                    <Button variant="ghost" size="icon" className="absolute right-0 top-0 size-9" onClick={() => onSearchChange("")}>
                        <X className="size-3.5" />
                    </Button>
                )}
            </div>
            {filters.map((filter) => (
                <Select key={filter.key} value={filter.value} onValueChange={filter.onChange}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder={filter.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All {filter.placeholder}</SelectItem>
                        {filter.options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ))}
            {children}
        </div>
    )
}

// ============= ACTIVE FILTERS =============
export function ActiveFilters({ filters, onClear }: { filters: { label: string; value: string }[]; onClear: (key: string) => void }) {
    if (filters.length === 0) return null
    return (
        <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
                <Badge key={f.label} variant="secondary" className="gap-1 pr-1">
                    {f.label}: {f.value}
                    <Button variant="ghost" size="icon" className="size-4 p-0 hover:bg-transparent" onClick={() => onClear(f.label)}>
                        <X className="size-3" />
                    </Button>
                </Badge>
            ))}
        </div>
    )
}

// ============= TYPES =============
export interface FilterOption {
    value: string
    label: string
}

export interface FilterConfig {
    key: string
    placeholder: string
    value: string
    options: FilterOption[]
    onChange: (value: string) => void
}

interface FilterToolbarProps {
    searchValue: string
    onSearchChange: (value: string) => void
    searchPlaceholder?: string
    filters?: FilterConfig[]
    className?: string
    children?: React.ReactNode
}
