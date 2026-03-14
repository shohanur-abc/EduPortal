"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Textarea as Textarea$ } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { FormTextareaProps, TextareaProps } from "./types";
import { cn } from "@/lib/utils";

// ─── RHF-integrated version ──────────────────────────────────────────────────

export const FormTextarea = ({
    name = "",
    label,
    description,
    className,
    classNames: cns,
    rules,
    showCount,
    ...props
}: FormTextareaProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={cn(className, cns?.field)}>
                    {label && (
                        <FieldLabel htmlFor={name} className={cns?.label}>
                            {label}
                        </FieldLabel>
                    )}
                    <Textarea
                        {...props}
                        id={name}
                        field={field}
                        fieldState={fieldState}
                        showCount={showCount}
                        className={cns?.textarea}
                        classNames={{ counter: cns?.counter }}
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

export const Textarea = ({
    field,
    fieldState,
    className,
    showCount,
    classNames: cns,
    "aria-invalid": ariaInvalid,
    onChange,
    maxLength,
    value,
    ...props
}: TextareaProps) => {
    const isInvalid = ariaInvalid ?? fieldState?.invalid;

    // Track length for character counter
    const [length, setLength] = React.useState<number>(() => {
        const initial = field?.value ?? value;
        return typeof initial === "string" ? initial.length : 0;
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLength(e.target.value.length);
        field?.onChange(e);
        onChange?.(e);
    };

    const textarea = (
        <Textarea$
            {...field}
            {...props}
            value={field?.value ?? value}
            maxLength={maxLength}
            aria-invalid={isInvalid}
            onChange={handleChange}
            className={cn(className, cns?.textarea)}
        />
    );

    if (showCount) {
        return (
            <div className={cn("relative w-full", cns?.root)}>
                {textarea}
                <div
                    className={cn(
                        "absolute bottom-2 right-3 text-xs tabular-nums text-muted-foreground select-none",
                        maxLength && length >= maxLength && "text-destructive font-medium",
                        cns?.counter
                    )}
                >
                    {maxLength ? `${length} / ${maxLength}` : length}
                </div>
            </div>
        );
    }

    return textarea;
};
