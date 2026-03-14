import type * as React from "react";
import type { LucideIcon } from "lucide-react";

// ============= TYPES =============

export interface NavMenuClassNames {
    root?: string;
    list?: string;
    item?: string;
    trigger?: string;
    content?: string;
    link?: string;
    indicator?: string;
    viewport?: string;
    featuredCard?: string;
    badge?: string;
    sectionHeader?: string;
    separator?: string;
}

// --- Base ---

type BaseNavItem = {
    key?: string;
    className?: string;
};

// --- Badge on link items ("New", "Beta", "Hot") ---

export type NavItemBadge = {
    label: string;
    variant?: "default" | "secondary" | "destructive" | "success" | "warning" | "info";
};

// --- Simple link (top-level or inside a group) ---

export type NavLinkItem = BaseNavItem & {
    type?: "link";
    label: string;
    href: string;
    icon?: LucideIcon;
    /** Thumbnail image URL */
    image?: string;
    description?: string;
    active?: boolean;
    disabled?: boolean;
    external?: boolean;
    /** Badge label, e.g. "New", "Beta" */
    badge?: NavItemBadge;
    /** Keyboard shortcut display string, e.g. "⌘K" */
    shortcut?: string;
};

// --- Featured card (inside a group / mega) ---

export type NavFeaturedItem = BaseNavItem & {
    type: "featured";
    label: string;
    href: string;
    description?: string;
    icon?: LucideIcon;
    bgClassName?: string;
    eyebrow?: string;
    cta?: string;
};

// --- Section divider inside a group or mega ---

export type NavSeparator = {
    type: "separator";
    key?: string;
};

// --- Section heading inside a group or mega column ---

export type NavSectionHeader = {
    type: "section";
    label: string;
    icon?: LucideIcon;
    key?: string;
};

/** Items allowed inside a group or mega section */
export type NavGroupChildItem = NavLinkItem | NavSeparator | NavSectionHeader;

// --- Group with dropdown (list / 2-col / 3-col) ---

export type NavGroupItem = BaseNavItem & {
    type: "group";
    label: string;
    icon?: LucideIcon;
    /** Grid layout for the dropdown content */
    layout?: "list" | "grid-2" | "grid-3";
    /** Optional featured item (shown as side card) */
    featured?: NavFeaturedItem;
    /** Items in the dropdown (links, separators, section headers) */
    items: NavGroupChildItem[];
    /** Override content width / class */
    contentClassName?: string;
    /** Custom header node above the items */
    header?: React.ReactNode;
    /** Custom footer node below the items */
    footer?: React.ReactNode;
};

// --- Mega menu (full-width multi-section) ---

export type NavMegaSection = {
    /** Section column title */
    title?: string;
    /** Section column icon (shown next to title) */
    icon?: LucideIcon;
    key?: string;
    items: NavGroupChildItem[];
};

export type NavMegaItem = BaseNavItem & {
    type: "mega";
    label: string;
    icon?: LucideIcon;
    /** Column sections */
    sections: NavMegaSection[];
    /** Optional featured card */
    featured?: NavFeaturedItem;
    /** Override content className */
    contentClassName?: string;
    /** Custom header rendered above sections */
    header?: React.ReactNode;
    /** Custom footer rendered below sections */
    footer?: React.ReactNode;
};

// --- Action button (onClick, no dropdown) ---

export type NavActionItem = BaseNavItem & {
    type: "action";
    label: string;
    icon?: LucideIcon;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "default" | "primary" | "ghost";
};

// --- Custom dropdown content ---

export type NavCustomItem = BaseNavItem & {
    type: "custom";
    label: string;
    /** Whether the trigger is rendered */
    triggerClassName?: string;
    content: React.ReactNode;
    contentClassName?: string;
};

export type NavMenuItem =
    | NavLinkItem
    | NavGroupItem
    | NavMegaItem
    | NavActionItem
    | NavCustomItem;

// --- Main Props ---

export interface NavMenuProps {
    items: NavMenuItem[];
    /** Show viewport (default: true) */
    viewport?: boolean;
    className?: string;
    classNames?: NavMenuClassNames;
}
