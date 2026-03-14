import type * as React from "react";
import type { LucideIcon } from "lucide-react";

// ============= TYPES =============

/** classNames for every internal element */
export interface DropdownClassNames {
    content?: string;
    label?: string;
    separator?: string;
    item?: string;
    itemIcon?: string;
    itemDescription?: string;
    badge?: string;
    subTrigger?: string;
    subContent?: string;
    checkboxItem?: string;
    radioItem?: string;
}

// --- Item Types ---

type BaseItem = {
    key?: string;
    className?: string;
};

export type MenuItemType = BaseItem & {
    type?: "item";
    label: string;
    icon?: LucideIcon;
    shortcut?: string;
    description?: string;
    badge?: string;
    disabled?: boolean;
    destructive?: boolean;
    inset?: boolean;
    onClick?: () => void;
};

export type LinkItemType = BaseItem & {
    type: "link";
    label: string;
    href: string;
    icon?: LucideIcon;
    shortcut?: string;
    badge?: string;
    description?: string;
    disabled?: boolean;
    destructive?: boolean;
    inset?: boolean;
    external?: boolean;
};

export type DividerType = BaseItem & {
    type: "divider";
};

export type LabelType = BaseItem & {
    type: "label";
    label: string;
    icon?: LucideIcon;
    inset?: boolean;
};

export type GroupType = BaseItem & {
    type: "group";
    label?: string;
    labelClassName?: string;
    items: DropdownItem[];
};

export type SubmenuType = BaseItem & {
    type: "submenu";
    label: string;
    icon?: LucideIcon;
    badge?: string;
    disabled?: boolean;
    destructive?: boolean;
    inset?: boolean;
    contentClassName?: string;
    items: DropdownItem[];
};

export type CheckboxItemType = BaseItem & {
    type: "checkbox";
    label: string;
    icon?: LucideIcon;
    shortcut?: string;
    checked?: boolean;
    disabled?: boolean;
    onCheckedChange?: (checked: boolean) => void;
};

export type RadioGroupType = BaseItem & {
    type: "radio-group";
    label?: string;
    labelClassName?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    options: {
        value: string;
        label: string;
        icon?: LucideIcon;
        shortcut?: string;
        disabled?: boolean;
        className?: string;
    }[];
};

export type CustomItemType = BaseItem & {
    type: "custom";
    children: React.ReactNode;
    disabled?: boolean;
    asChild?: boolean;
    /** Prevent the dropdown from closing when this item is clicked */
    preventClose?: boolean;
    onClick?: () => void;
};

export type DropdownItem =
    | MenuItemType
    | LinkItemType
    | DividerType
    | LabelType
    | GroupType
    | SubmenuType
    | CheckboxItemType
    | RadioGroupType
    | CustomItemType;

// --- Dropdown Props ---

export interface DropdownProps {
    trigger: React.ReactNode;
    items: DropdownItem[];
    label?: string;
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    alignOffset?: number;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    modal?: boolean;
    className?: string;
    classNames?: DropdownClassNames;
}
