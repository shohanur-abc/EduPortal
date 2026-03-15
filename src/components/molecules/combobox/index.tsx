"use client";

import * as React from "react";
import {
    Combobox as ComboboxPrimitive,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxCollection,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxLabel,
    ComboboxList,
    ComboboxSeparator,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox";
import { cn } from "@/lib/utils";
import type { ComboboxProps, ComboboxOption, ComboboxGroupDef } from "./types";

export type {
    ComboboxClassNames,
    ComboboxOption,
    ComboboxGroupDef,
    ComboboxSingleProps,
    ComboboxMultiProps,
    ComboboxProps,
} from "./types";

// ============= HELPERS =============

function buildGroupedItems(
    options: ComboboxOption[],
    groups: ComboboxGroupDef[]
): { value: string; label: string; items: ComboboxOption[] }[] {
    return groups.map((g) => ({
        value: g.key,
        label: g.label,
        items: options.filter((o) => o.group === g.key),
    }));
}

// ============= INNER LIST — FLAT =============

function FlatList({
    options,
    classNames: cns,
}: {
    options: ComboboxOption[];
    classNames?: ComboboxProps["classNames"];
}) {
    return (
        <ComboboxList className={cn(cns?.list)}>
            {(opt: ComboboxOption) => (
                <ComboboxItem
                    key={opt.value}
                    value={opt}
                    disabled={opt.disabled}
                    className={cn(cns?.item)}
                >
                    {opt.icon && <opt.icon className={cn("size-4 shrink-0", cns?.itemIcon)} />}
                    <span className="flex-1 truncate">{opt.label}</span>
                    {opt.description && (
                        <span className="ml-2 truncate text-xs text-muted-foreground">{opt.description}</span>
                    )}
                </ComboboxItem>
            )}
        </ComboboxList>
    );
}

// ============= INNER LIST — GROUPED =============

function GroupedList({
    groupedItems,
    classNames: cns,
}: {
    groupedItems: { value: string; label: string; items: ComboboxOption[] }[];
    classNames?: ComboboxProps["classNames"];
}) {
    return (
        <ComboboxList className={cn(cns?.list)}>
            {(group: { value: string; label: string; items: ComboboxOption[] }, idx: number) => (
                <ComboboxGroup
                    key={group.value}
                    items={group.items}
                    className={cn(cns?.group)}
                >
                    <ComboboxLabel className={cn(cns?.groupLabel)}>{group.label}</ComboboxLabel>
                    <ComboboxCollection>
                        {(opt: ComboboxOption) => (
                            <ComboboxItem
                                key={opt.value}
                                value={opt}
                                disabled={opt.disabled}
                                className={cn(cns?.item)}
                            >
                                {opt.icon && <opt.icon className={cn("size-4 shrink-0", cns?.itemIcon)} />}
                                <span className="flex-1 truncate">{opt.label}</span>
                                {opt.description && (
                                    <span className="ml-2 truncate text-xs text-muted-foreground">{opt.description}</span>
                                )}
                            </ComboboxItem>
                        )}
                    </ComboboxCollection>
                    {idx < groupedItems.length - 1 && (
                        <ComboboxSeparator className={cn(cns?.separator)} />
                    )}
                </ComboboxGroup>
            )}
        </ComboboxList>
    );
}

// ============= MAIN COMPONENT =============

export function ComboboxSelect({
    options,
    groups,
    placeholder,
    searchPlaceholder,
    disabled = false,
    clearable = false,
    showTrigger = true,
    emptyMessage = "No results found.",
    className,
    classNames: cns,
    ...props
}: ComboboxProps) {
    const isGrouped = !!groups?.length;
    const groupedItems = isGrouped ? buildGroupedItems(options, groups!) : undefined;

    // ── Value mapping: string ↔ ComboboxOption ──────────────────────────────
    function toOption(val: string): ComboboxOption | null {
        return options.find((o) => o.value === val) ?? null;
    }

    // ── Build Combobox primitive props ───────────────────────────────────────
    const listContent = isGrouped ? (
        <GroupedList groupedItems={groupedItems!} classNames={cns} />
    ) : (
        <FlatList options={options} classNames={cns} />
    );

    if (props.multiple) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const anchor = useComboboxAnchor();
        const primitiveValue = props.value?.map(toOption).filter(Boolean) as ComboboxOption[] | undefined;
        const primitiveDefault = props.defaultValue?.map(toOption).filter(Boolean) as ComboboxOption[] | undefined;

        return (
            <ComboboxPrimitive
                multiple
                autoHighlight
                items={isGrouped ? groupedItems : options}
                value={primitiveValue}
                defaultValue={primitiveDefault}
                onValueChange={(opts) => {
                    props.onValueChange?.((opts as ComboboxOption[]).map((o) => o.value));
                }}
                disabled={disabled}
            >
                <ComboboxChips ref={anchor} className={cn(cns?.chips)}>
                    <ComboboxValue>
                        {(values: ComboboxOption[]) => (
                            <React.Fragment>
                                {values.map((opt) => (
                                    <ComboboxChip key={opt.value} className={cn(cns?.chip)}>
                                        {opt.icon && <opt.icon className="mr-1 size-3 shrink-0" />}
                                        {opt.label}
                                    </ComboboxChip>
                                ))}
                                <ComboboxChipsInput
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    className={cn(cns?.chipInput)}
                                />
                            </React.Fragment>
                        )}
                    </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent anchor={anchor} className={cn(cns?.content)}>
                    <ComboboxEmpty className={cn(cns?.empty)}>{emptyMessage}</ComboboxEmpty>
                    {listContent}
                </ComboboxContent>
            </ComboboxPrimitive>
        );
    }

    // single
    const primitiveValue = props.value !== undefined ? toOption(props.value) : undefined;
    const primitiveDefault = props.defaultValue !== undefined ? toOption(props.defaultValue) : undefined;

    return (
        <div className={cn(className, cns?.root)}>
            <ComboboxPrimitive
                items={isGrouped ? groupedItems : options}
                value={primitiveValue}
                defaultValue={primitiveDefault}
                onValueChange={(opt) => {
                    props.onValueChange?.((opt as ComboboxOption | null)?.value ?? "");
                }}
                disabled={disabled}
            >
                <ComboboxInput
                    placeholder={placeholder ?? searchPlaceholder ?? "Select…"}
                    showTrigger={showTrigger}
                    showClear={clearable}
                    disabled={disabled}
                    className={cn(cns?.input)}
                />
                <ComboboxContent className={cn(cns?.content)}>
                    <ComboboxEmpty className={cn(cns?.empty)}>{emptyMessage}</ComboboxEmpty>
                    {listContent}
                </ComboboxContent>
            </ComboboxPrimitive>
        </div>
    );
}
