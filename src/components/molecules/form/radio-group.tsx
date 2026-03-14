"use client";

import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup as RadioGroup$, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { FormRadioGroupProps, RadioGroupProps } from "./types";
import { cn } from "@/lib/utils";

// ─── RHF-integrated version ──────────────────────────────────────────────────

export const FormRadioGroup = ({
    name = "",
    label,
    description,
    className,
    classNames: cns,
    rules,
    ...props
}: FormRadioGroupProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={cn(className, cns?.field)}>
                    {label && (
                        <FieldLabel className={cns?.label}>{label}</FieldLabel>
                    )}
                    <RadioGroup
                        {...props}
                        field={field}
                        fieldState={fieldState}
                        classNames={{
                            root: cns?.root,
                            item: cns?.item,
                            label: cns?.itemLabel,
                        }}
                    />
                    {description && (
                        <FieldDescription className={cns?.description}>{description}</FieldDescription>
                    )}
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className={cns?.error} />
                    )}
                </Field>
            )}
        />
    );
};

// ─── Standalone / shared primitive ───────────────────────────────────────────

export const RadioGroup = ({
    field,
    fieldState,
    options,
    value,
    defaultValue,
    onValueChange,
    disabled,
    required,
    orientation = "vertical",
    variant = "default",
    id,
    name,
    className,
    classNames: cns,
    "aria-invalid": ariaInvalid,
}: RadioGroupProps) => {
    const isInvalid = ariaInvalid ?? fieldState?.invalid;
    const controlledValue = field ? (field.value ?? "") : value;

    const handleValueChange = (val: string) => {
        field?.onChange(val);
        onValueChange?.(val);
    };

    // ── button variant ──────────────────────────────────────────────────────
    if (variant === "button") {
        return (
            <RadioGroup$
                id={id || field?.value}
                name={name ?? field?.name}
                value={controlledValue}
                defaultValue={defaultValue}
                onValueChange={handleValueChange}
                onBlur={field?.onBlur}
                disabled={disabled ?? field?.disabled}
                required={required}
                aria-invalid={isInvalid}
                className={cn("flex flex-row flex-wrap gap-1", cns?.root, className)}
            >
                {options.map((opt) => {
                    const isSelected = (controlledValue ?? defaultValue) === opt.value;
                    return (
                        <Label
                            key={opt.value}
                            htmlFor={`${id ?? field?.name ?? name}-${opt.value}`}
                            className={cn(
                                "flex cursor-pointer items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                                "hover:bg-accent hover:text-accent-foreground",
                                isSelected
                                    ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                                    : "border-input bg-background",
                                opt.disabled && "pointer-events-none opacity-50",
                                cns?.item
                            )}
                        >
                            <RadioGroupItem
                                value={opt.value}
                                id={`${id ?? field?.name ?? name}-${opt.value}`}
                                disabled={opt.disabled}
                                className="sr-only"
                            />
                            {opt.label}
                        </Label>
                    );
                })}
            </RadioGroup$>
        );
    }

    // ── card variant ────────────────────────────────────────────────────────
    if (variant === "card") {
        return (
            <RadioGroup$
                id={id}
                name={name ?? field?.name}
                value={controlledValue}
                defaultValue={defaultValue}
                onValueChange={handleValueChange}
                onBlur={field?.onBlur}
                disabled={disabled ?? field?.disabled}
                required={required}
                aria-invalid={isInvalid}
                className={cn(
                    orientation === "horizontal"
                        ? "flex flex-row flex-wrap gap-3"
                        : "flex flex-col gap-2",
                    cns?.root,
                    className
                )}
            >
                {options.map((opt) => {
                    const isSelected = (controlledValue ?? defaultValue) === opt.value;
                    return (
                        <Label
                            key={opt.value}
                            htmlFor={`${id ?? field?.name ?? name}-${opt.value}`}
                            className={cn(
                                "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                                "hover:bg-accent/50",
                                isSelected
                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                    : "border-border bg-card",
                                opt.disabled && "pointer-events-none opacity-50",
                                opt.description ? "items-start" : "items-center",
                                cns?.item
                            )}
                        >
                            <RadioGroupItem
                                value={opt.value}
                                id={`${id ?? field?.name ?? name}-${opt.value}`}
                                disabled={opt.disabled}
                                className={cn("mt-0.5 shrink-0", !opt.description && "mt-0")}
                            />
                            <div className="flex flex-col gap-0.5 leading-snug">
                                <span className={cn("text-sm font-medium", cns?.label)}>{opt.label}</span>
                                {opt.description && (
                                    <span className={cn("text-xs text-muted-foreground", cns?.description)}>
                                        {opt.description}
                                    </span>
                                )}
                            </div>
                        </Label>
                    );
                })}
            </RadioGroup$>
        );
    }

    // ── default variant ─────────────────────────────────────────────────────
    return (
        <RadioGroup$
            id={id}
            name={name ?? field?.name}
            value={controlledValue}
            defaultValue={defaultValue}
            onValueChange={handleValueChange}
            onBlur={field?.onBlur}
            disabled={disabled ?? field?.disabled}
            required={required}
            aria-invalid={isInvalid}
            className={cn(
                orientation === "horizontal" && "flex flex-row flex-wrap gap-4",
                cns?.root,
                className
            )}
        >
            {options.map((opt) => (
                <div key={opt.value} className={cn("flex items-start gap-3", cns?.item)}>
                    <RadioGroupItem
                        value={opt.value}
                        id={`${id ?? field?.name ?? name}-${opt.value}`}
                        disabled={opt.disabled}
                        className={cn("mt-0.5 shrink-0", !opt.description && "mt-0")}
                    />
                    <Label
                        htmlFor={`${id ?? field?.name ?? name}-${opt.value}`}
                        className={cn(
                            "flex flex-col items-start gap-0.5 font-normal cursor-pointer leading-snug",
                            opt.disabled && "opacity-50",
                            cns?.label
                        )}
                    >
                        <span className="text-sm font-medium">{opt.label}</span>
                        {opt.description && (
                            <span className={cn("text-xs text-muted-foreground", cns?.description)}>
                                {opt.description}
                            </span>
                        )}
                    </Label>
                </div>
            ))}
        </RadioGroup$>
    );
};
