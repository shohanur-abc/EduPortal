"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Checkbox as Checkbox$ } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { CheckboxProps, FormCheckboxProps } from "./types";
import { cn } from "@/lib/utils";

// ─── RHF-integrated version ──────────────────────────────────────────────────

export const FormCheckbox = ({
    name = "",
    label,
    description,
    className,
    classNames: cns,
    rules,
    ...props
}: FormCheckboxProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={cn(className, cns?.field)}>
                    <Checkbox
                        {...props}
                        id={name}
                        field={field}
                        fieldState={fieldState}
                        label={label}
                        description={description}
                        classNames={{
                            checkbox: cns?.checkbox,
                            label: cns?.label,
                            description: cns?.description,
                        }}
                    />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className={cns?.error} />
                    )}
                </Field>
            )}
        />
    );
};

// ─── Standalone / shared primitive ───────────────────────────────────────────

export const Checkbox = ({
    field,
    fieldState,
    checked,
    defaultChecked,
    onCheckedChange,
    disabled,
    required,
    id,
    name,
    value,
    label,
    description,
    className,
    classNames: cns,
    "aria-invalid": ariaInvalid,
}: CheckboxProps) => {
    const isInvalid = ariaInvalid ?? fieldState?.invalid;
    const isChecked = field ? !!field.value : checked;

    const handleCheckedChange = (val: boolean) => {
        field?.onChange(val);
        onCheckedChange?.(val);
    };

    return (
        <div className={cn("flex items-start gap-2", className, cns?.root)}>
            <Checkbox$
                id={id ?? field?.name ?? name}
                name={name ?? field?.name}
                checked={isChecked}
                defaultChecked={defaultChecked}
                onCheckedChange={handleCheckedChange}
                onBlur={field?.onBlur}
                disabled={disabled ?? field?.disabled}
                required={required}
                value={value}
                aria-invalid={isInvalid}
                className={cns?.checkbox}
            />
            {(label || description) && (
                // <div className="flex flex-col gap-0.5 leading-snug">
                <FieldContent>
                    {label && (
                        <FieldLabel
                            htmlFor={id ?? field?.name ?? name}
                            className={cn(description && "leading-none", cns?.label)}
                        >
                            {label}
                        </FieldLabel>
                    )}
                    {description && (
                        <FieldDescription className={cn("text-xs text-muted-foreground", cns?.description)}>
                            {description}
                        </FieldDescription>
                    )}
                </FieldContent>
                // </div>
            )}
        </div>
    );
};
