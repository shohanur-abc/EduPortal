import type * as React from "react";
import type { LucideIcon } from "lucide-react";

// ============= TYPES =============

export interface ComboboxClassNames {
    root?: string;
    trigger?: string;
    content?: string;
    list?: string;
    item?: string;
    itemIcon?: string;
    group?: string;
    groupLabel?: string;
    separator?: string;
    empty?: string;
    chips?: string;
    chip?: string;
    chipInput?: string;
    input?: string;
}

export interface ComboboxOption {
    value: string;
    label: string;
    icon?: LucideIcon;
    description?: string;
    disabled?: boolean;
    /** Group key this option belongs to */
    group?: string;
}

export interface ComboboxGroupDef {
    key: string;
    label: string;
}

/** Shared props for all combobox modes */
interface ComboboxBaseProps {
    options: ComboboxOption[];
    /** Logical grouping metadata */
    groups?: ComboboxGroupDef[];
    placeholder?: string;
    searchPlaceholder?: string;
    disabled?: boolean;
    /** Show X clear button */
    clearable?: boolean;
    /** Show the chevron toggle button inside the input */
    showTrigger?: boolean;
    /** Empty state message */
    emptyMessage?: string;
    className?: string;
    classNames?: ComboboxClassNames;
}

/** Single-value select */
export interface ComboboxSingleProps extends ComboboxBaseProps {
    multiple?: false;
    value?: string;
    onValueChange?: (value: string) => void;
    defaultValue?: string;
}

/** Multi-value select with chip display */
export interface ComboboxMultiProps extends ComboboxBaseProps {
    multiple: true;
    value?: string[];
    onValueChange?: (value: string[]) => void;
    defaultValue?: string[];
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultiProps;
