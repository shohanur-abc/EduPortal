"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cva } from "class-variance-authority"
import { ChevronRight, MoreHorizontal, type LucideIcon } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar, } from "@/components/ui/sidebar"
import { Dropdown, type DropdownItem } from "@/components/molecules/dropdown"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"

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
)

// ============= HELPERS =============

function isAnyChildActive(items: SidebarNavItem[], pathname: string): boolean {
    for (const i of items) {
        if (i.type === "separator" || i.type === "custom") continue
        if (i.type === "group" || i.type === "collapsible") {
            if (isAnyChildActive(i.items, pathname)) return true
        } else if (!i.type || i.type === "item") {
            if (i.href && i.href !== "#" && (pathname === i.href || pathname.startsWith(i.href + "/"))) return true
        }
    }
    return false
}

/** Recursively filter nav items by a search string (case-insensitive label match). */
export function filterNavItems(items: SidebarNavItem[], query: string): SidebarNavItem[] {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.reduce<SidebarNavItem[]>((acc, i) => {
        if (i.type === "separator" || i.type === "custom") return acc
        if (i.type === "group") {
            const filtered = filterNavItems(i.items, query)
            if (filtered.length > 0) acc.push({ ...i, items: filtered })
        } else if (i.type === "collapsible") {
            const filtered = filterNavItems(i.items, query)
            if (i.label.toLowerCase().includes(q) || filtered.length > 0)
                acc.push({ ...i, items: filtered, defaultOpen: filtered.length > 0 })
        } else if (!i.type || i.type === "item") {
            if (i.label.toLowerCase().includes(q)) acc.push(i)
        }
        return acc
    }, [])
}

/**
 * Convert a SidebarNavItem to a DropdownItem — recursively for icon/collapsed mode.
 */
function navItemToDropdownItem(item: SidebarNavItem): DropdownItem {
    if (item.type === "separator") {
        return { type: "divider", key: item.key }
    }
    if (item.type === "custom") {
        return { type: "custom", children: item.children, key: item.key }
    }
    if (item.type === "group") {
        return {
            type: "group",
            label: item.label,
            items: item.items.map(navItemToDropdownItem),
            key: item.key,
        }
    }
    if (item.type === "collapsible") {
        return {
            type: "submenu",
            label: item.label,
            icon: item.icon,
            badge: item.badge?.toString(),
            items: item.items.map(navItemToDropdownItem),
            key: item.key,
        }
    }
    // leaf item (type: "item" or undefined)
    const hasHref = item.href != null && item.href !== "#"
    return {
        type: hasHref ? "link" : "item",
        label: item.label,
        href: hasHref ? item.href : undefined,
        icon: item.icon,
        onClick: item.onClick,
        disabled: item.disabled,
        external: item.external,
        key: item.key,
    } as DropdownItem
}

/** ScrollArea with sessionStorage-based scroll position persistence. */
function PersistentScrollArea({
    children,
    storageKey,
    className,
}: {
    children: React.ReactNode
    storageKey: string
    className?: string
}) {
    const wrapperRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const wrapper = wrapperRef.current
        if (!wrapper) return
        const viewport = wrapper.querySelector<HTMLDivElement>('[data-slot="scroll-area-viewport"]')
        if (!viewport) return
        // Restore
        const saved = sessionStorage.getItem(storageKey)
        if (saved) viewport.scrollTop = Number(saved)
        // Save on scroll
        const onScroll = () => sessionStorage.setItem(storageKey, String(viewport.scrollTop))
        viewport.addEventListener("scroll", onScroll, { passive: true })
        return () => viewport.removeEventListener("scroll", onScroll)
    }, [storageKey])

    return (
        <div ref={wrapperRef} className={cn("min-h-0 flex-1 contents", className)}>
            <ScrollArea className="min-h-0 flex-1">
                {children}
            </ScrollArea>
        </div>
    )
}

// ============= RECURSIVE NAV RENDERER =============

function NavRenderer({
    items,
    depth = 0,
    classNames: cns,
}: {
    items: SidebarNavItem[]
    depth?: number
    classNames?: SidebarClassNames
}) {
    if (depth === 0) {
        return (
            <SidebarMenu>
                {items.map((item, i) => (
                    <NavItem key={item.key ?? i} item={item} depth={depth} classNames={cns} />
                ))}
            </SidebarMenu>
        )
    }
    return (
        <SidebarMenuSub>
            {items.map((item, i) => (
                <NavItem key={item.key ?? i} item={item} depth={depth} classNames={cns} />
            ))}
        </SidebarMenuSub>
    )
}

function NavItem({
    item,
    depth,
    classNames: cns,
}: {
    item: SidebarNavItem
    depth: number
    classNames?: SidebarClassNames
}) {
    const pathname = usePathname()

    // SEPARATOR
    if (item.type === "separator") {
        return <SidebarSeparator className={cn(cns?.separator, item.className)} />
    }

    // CUSTOM
    if (item.type === "custom") {
        return <>{item.children}</>
    }

    // GROUP
    if (item.type === "group") {
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
        )
    }

    // COLLAPSIBLE
    if (item.type === "collapsible") {
        const childActive = isAnyChildActive(item.items, pathname)
        if (depth === 0) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { state: sidebarState } = useSidebar()
            const isIconMode = sidebarState === "collapsed"

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
                )
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
            )
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
        )
    }

    // LEAF ITEM — depth 0
    if (depth === 0) {
        const effectiveActive = item.active ?? (
            item.href != null && item.href !== "#" && (pathname === item.href || pathname.startsWith(item.href + "/"))
        )
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
        )

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
        )
    }

    // LEAF ITEM — depth > 0 (sub-item)
    const effectiveSubActive = item.active ?? (
        item.href != null && item.href !== "#" && (pathname === item.href || pathname.startsWith(item.href + "/"))
    )
    const subBadge = item.badge != null ? (
        <span className={cn(
            "ml-auto flex h-4 min-w-4 shrink-0 items-center justify-center rounded px-1 text-[10px] font-medium tabular-nums select-none",
            "bg-sidebar-primary/10 text-sidebar-foreground",
            "group-data-[collapsible=icon]:hidden",
            cns?.badge
        )}>
            {item.badge}
        </span>
    ) : null
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
    )
}

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
        : nav

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
                                // Flat group: items at root level (not wrapped in extra SidebarGroup)
                                if (section.type === "separator") {
                                    return <SidebarSeparator key={section.key ?? i} className={cn(cns?.separator, section.className)} />
                                }
                                if (section.type === "custom") {
                                    return <React.Fragment key={section.key ?? i}>{section.children}</React.Fragment>
                                }
                                if (section.type === "group") {
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
                                    )
                                }
                                // Everything else treated as root-level items inside a group
                                return (
                                    <SidebarGroup key={section.key ?? i}>
                                        <SidebarGroupContent>
                                            <NavRenderer items={[section]} depth={0} classNames={cns} />
                                        </SidebarGroupContent>
                                    </SidebarGroup>
                                )
                            })

                    return scrollable
                        ? persistScrollKey
                            ? <PersistentScrollArea storageKey={persistScrollKey}>{navContent}</PersistentScrollArea>
                            : <ScrollArea className="min-h-0 flex-1">{navContent}</ScrollArea>
                        : <>{navContent}</>
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
    )
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
    )
}

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
            <SidebarMenuItem className="flex justify-baseline ">
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
                {/* <AnimatedThemeToggler className='mr-3 mb-2' /> */}

            </SidebarMenuItem>
        </SidebarMenu>
    )
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
    const { isMobile } = useSidebar()

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
    )

    if (!actions?.length) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>{inner}</SidebarMenuItem>
            </SidebarMenu>
        )
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
                    contentWidth="14rem"
                />
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

/** Inline default trigger bar for SidebarInset headers */
export function SidebarInsetHeader({
    children,
    className,
}: {
    children?: React.ReactNode
    className?: string
}) {
    return (
        <header className={cn("flex h-14 shrink-0 items-center gap-2 border-b px-4", className)}>
            <SidebarTrigger className="-ml-1" />
            {children}
        </header>
    )
}

// ============= RE-EXPORTS for convenience =============
export { SidebarTrigger, useSidebar, sidebarMenuButtonVariants, SidebarMenu, SidebarMenuItem, SidebarMenuButton }

// ============= TYPES =============

export interface SidebarClassNames {
    provider?: string
    sidebar?: string
    header?: string
    content?: string
    footer?: string
    inset?: string
    group?: string
    groupLabel?: string
    separator?: string
    menuButton?: string
    subButton?: string
    menuAction?: string
    itemIcon?: string
    badge?: string
    chevron?: string
    search?: string
}

// --- Nav Item Types ---

type BaseNavItem = {
    key?: string
    className?: string
}

export type SidebarNavLeaf = BaseNavItem & {
    type?: "item"
    label: string
    href?: string
    icon?: LucideIcon
    tooltip?: string
    badge?: string | number
    active?: boolean
    disabled?: boolean
    external?: boolean
    onClick?: () => void
    actions?: DropdownItem[]
    wrapperClassName?: string
}

export type SidebarNavGroup = BaseNavItem & {
    type: "group"
    label?: string
    labelClassName?: string
    labelIcon?: LucideIcon
    action?: () => void
    actionTitle?: string
    actionIcon?: LucideIcon
    items: SidebarNavItem[]
}

export type SidebarNavCollapsible = BaseNavItem & {
    type: "collapsible"
    label: string
    icon?: LucideIcon
    defaultOpen?: boolean
    active?: boolean
    badge?: string | number
    items: SidebarNavItem[]
}

export type SidebarNavSeparator = BaseNavItem & {
    type: "separator"
}

export type SidebarNavCustom = {
    type: "custom"
    children: React.ReactNode
    key?: string
}

export type SidebarNavItem =
    | SidebarNavLeaf
    | SidebarNavGroup
    | SidebarNavCollapsible
    | SidebarNavSeparator
    | SidebarNavCustom

// --- Component Props ---

export interface SidebarSearchConfig {
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    className?: string
    /** Auto-filter nav items by search value. Defaults to true. Set to false for custom filtering. */
    autoFilter?: boolean
}

export interface SidebarPanelProps {
    nav: SidebarNavItem[]
    header?: React.ReactNode
    footer?: React.ReactNode
    search?: SidebarSearchConfig
    rail?: boolean
    /** Wrap the nav content in ScrollArea for styled scrollbars. Defaults to true. */
    scrollable?: boolean
    /** sessionStorage key for scroll position persistence across navigations. Requires scrollable=true. */
    persistScrollKey?: string
    variant?: "sidebar" | "floating" | "inset"
    side?: "left" | "right"
    collapsible?: "offcanvas" | "icon" | "none"
    className?: string
    classNames?: SidebarClassNames
    loading?: boolean
    skeletonCount?: number
}

export interface SidebarLayoutProps extends SidebarPanelProps {
    children: React.ReactNode
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
    insetClassName?: string
    /** Content rendered at top of SidebarInset (e.g. a trigger header bar). */
    topbar?: React.ReactNode
    classNames?: SidebarClassNames
    /** Inline styles on the SidebarProvider wrapper — use for CSS variable overrides like --sidebar-background */
    providerStyle?: React.CSSProperties
}

export interface SidebarBrandProps {
    /** A component type (LucideIcon, etc.) or a pre-rendered ReactElement */
    logo?: React.ElementType | React.ReactElement
    name: string
    subtitle?: string
    href?: string
    className?: string
}

export interface SidebarUserProps {
    name: string
    email?: string
    avatar?: string
    avatarFallback?: string
    actions?: DropdownItem[]
    className?: string
}
