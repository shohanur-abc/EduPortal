"use client";

import { Controller, useFormContext } from "react-hook-form";
import {
    Select as SelectCN,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { FormSelectProps, SelectProps } from "./types";
import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";

// ─── RHF-integrated version ──────────────────────────────────────────────────

export const FormSelect = ({
    name = "",
    rules,
    ...props
}: FormSelectProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <Select
                    {...props}
                    id={name}
                    field={field}
                    fieldState={fieldState}
                />
            )}
        />
    );
};

// ─── Standalone / shared primitive ───────────────────────────────────────────

export const Select = ({
    field,
    fieldState,
    label,
    description,
    options,
    groups,
    placeholder = "Select an option",
    size,
    disabled,
    value,
    defaultValue,
    onValueChange,
    required,
    open,
    defaultOpen,
    onOpenChange,
    id,
    name,
    className,
    classNames: cns,
    children,
    "aria-invalid": ariaInvalid,
}: SelectProps) => {
    const isInvalid = ariaInvalid ?? fieldState?.invalid;
    const controlledValue = field ? (field.value ?? "") : value;
    const Comp = (label || description) ? Field : Fragment;
    const handleValueChange = (val: string) => {
        field?.onChange(val);
        onValueChange?.(val);
    };

    return (
        <Comp {...(Comp !== Fragment && { "data-invalid": fieldState?.invalid, className: cn(cns?.field) })}>
            {label && (
                <FieldLabel htmlFor={name} className={cns?.label}>
                    {label}
                </FieldLabel>
            )}
            <SelectCN

                value={controlledValue}
                defaultValue={defaultValue}
                onValueChange={handleValueChange}
                disabled={disabled ?? field?.disabled}
                required={required}
                open={open}
                defaultOpen={defaultOpen}
                onOpenChange={onOpenChange}
                name={name ?? field?.name}
            >
                <SelectTrigger
                    id={id}
                    size={size}
                    aria-invalid={isInvalid}
                    onBlur={field?.onBlur}
                    className={cn("w-full", className, cns?.trigger)}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className={cns?.content}>
                    {children ? (
                        children
                    ) : groups?.length ? (
                        groups.map((group, gIdx) => (
                            <SelectGroup key={gIdx}>
                                {group.label && (
                                    <SelectLabel className={cns?.label}>{group.label}</SelectLabel>
                                )}
                                {gIdx > 0 && !group.label && (
                                    <SelectSeparator className={cns?.separator} />
                                )}
                                {group.options.map((opt) => (
                                    <SelectItem
                                        key={opt.value}
                                        value={opt.value}
                                        disabled={opt.disabled}
                                        className={cns?.item}
                                    >
                                        {opt.icon && <opt.icon className="size-4 shrink-0" />}
                                        <span className="flex-1 capitalize">{opt.label}</span>
                                        {opt.description && (
                                            <span className="ml-auto text-xs text-muted-foreground">
                                                {opt.description}
                                            </span>
                                        )}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        ))
                    ) : options?.length ? (
                        <SelectGroup>
                            {options.map((opt) => (
                                <SelectItem
                                    key={opt.value}
                                    value={opt.value}
                                    disabled={opt.disabled}
                                    className={cns?.item}
                                >
                                    {opt.icon && <opt.icon className="size-4 shrink-0" />}
                                    <span className="flex-1 capitalize">{opt.label}</span>
                                    {opt.description && (
                                        <span className="ml-auto text-xs text-muted-foreground">
                                            {opt.description}
                                        </span>
                                    )}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    ) : null}
                </SelectContent>
            </SelectCN>
            {description && (
                <FieldDescription className={cns?.description}>{description}</FieldDescription>
            )}
            {fieldState?.invalid && (
                <FieldError errors={[fieldState.error]} className={cns?.error} />
            )}
        </Comp>
    );
};
