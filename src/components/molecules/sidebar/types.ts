import type * as React from "react";
import type { LucideIcon } from "lucide-react";
import type { DropdownItem } from "@/components/molecules/dropdown";

// ============= TYPES =============

export interface SidebarClassNames {
    provider?: string;
    sidebar?: string;
    header?: string;
    content?: string;
    footer?: string;
    inset?: string;
    group?: string;
    groupLabel?: string;
    separator?: string;
    menuButton?: string;
    subButton?: string;
    menuAction?: string;
    itemIcon?: string;
    badge?: string;
    chevron?: string;
    search?: string;
}

// --- Nav Item Types ---

type BaseNavItem = {
    key?: string;
    className?: string;
};

export type SidebarNavLeaf = BaseNavItem & {
    type?: "item";
    label: string;
    href?: string;
    icon?: LucideIcon;
    tooltip?: string;
    badge?: string | number;
    active?: boolean;
    disabled?: boolean;
    external?: boolean;
    onClick?: () => void;
    actions?: DropdownItem[];
    wrapperClassName?: string;
};

export type SidebarNavGroup = BaseNavItem & {
    type: "group";
    label?: string;
    labelClassName?: string;
    labelIcon?: LucideIcon;
    action?: () => void;
    actionTitle?: string;
    actionIcon?: LucideIcon;
    items: SidebarNavItem[];
};

export type SidebarNavCollapsible = BaseNavItem & {
    type: "collapsible";
    label: string;
    icon?: LucideIcon;
    defaultOpen?: boolean;
    active?: boolean;
    badge?: string | number;
    items: SidebarNavItem[];
};

export type SidebarNavSeparator = BaseNavItem & {
    type: "separator";
};

export type SidebarNavCustom = {
    type: "custom";
    children: React.ReactNode;
    key?: string;
};

export type SidebarNavItem =
    | SidebarNavLeaf
    | SidebarNavGroup
    | SidebarNavCollapsible
    | SidebarNavSeparator
    | SidebarNavCustom;

// --- Component Props ---

export interface SidebarSearchConfig {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    /** Auto-filter nav items by search value. Defaults to true. Set to false for custom filtering. */
    autoFilter?: boolean;
}

export interface SidebarPanelProps {
    nav: SidebarNavItem[];
    header?: React.ReactNode;
    footer?: React.ReactNode;
    search?: SidebarSearchConfig;
    rail?: boolean;
    /** Wrap the nav content in ScrollArea for styled scrollbars. Defaults to true. */
    scrollable?: boolean;
    /** sessionStorage key for scroll position persistence across navigations. Requires scrollable=true. */
    persistScrollKey?: string;
    variant?: "sidebar" | "floating" | "inset";
    side?: "left" | "right";
    collapsible?: "offcanvas" | "icon" | "none";
    className?: string;
    classNames?: SidebarClassNames;
    loading?: boolean;
    skeletonCount?: number;
}

export interface SidebarLayoutProps extends SidebarPanelProps {
    children: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    insetClassName?: string;
    /** Content rendered at top of SidebarInset (e.g. a trigger header bar). */
    topbar?: React.ReactNode;
    classNames?: SidebarClassNames;
    /** Inline styles on the SidebarProvider wrapper — use for CSS variable overrides like --sidebar-background */
    providerStyle?: React.CSSProperties;
}

export interface SidebarBrandProps {
    /** A component type (LucideIcon, etc.) or a pre-rendered ReactElement */
    logo?: React.ElementType | React.ReactElement;
    name: string;
    subtitle?: string;
    href?: string;
    className?: string;
}

export interface SidebarUserProps {
    name: string;
    email?: string;
    avatar?: string;
    avatarFallback?: string;
    actions?: DropdownItem[];
    className?: string;
}
