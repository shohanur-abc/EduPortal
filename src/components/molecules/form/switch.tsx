"use client";

import { cva } from "class-variance-authority";
import { Controller, useFormContext } from "react-hook-form";
import { Switch as Switch$ } from "@/components/ui/switch";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldTitle, } from "@/components/ui/field";
import { FormSwitchProps, SwitchProps } from "./types";
import { cn } from "@/lib/utils";

// ─── CVA ─────────────────────────────────────────────────────────────────────

const switchRowVariants = cva("flex gap-3", {
    variants: {
        position: {
            start: "items-center",
            end: "items-start justify-between",
        },
    },
    defaultVariants: {
        position: "start",
    },
});

// ─── SwitchGroup ─────────────────────────────────────────────────────────────
// Wraps multiple card-variant switches in a bordered group with consistent gap.

export function SwitchGroup({
    className,
    ...props
}: React.ComponentProps<typeof FieldGroup>) {
    return <FieldGroup className={cn("gap-2", className)} {...props} />;
}

// ─── RHF-integrated version ──────────────────────────────────────────────────

export const FormSwitch = ({
    name = "",
    label,
    description,
    className,
    classNames: cns,
    rules,
    ...props
}: FormSwitchProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={cn(className, cns?.field)}>
                    <Switch
                        {...props}
                        id={name}
                        field={field}
                        fieldState={fieldState}
                        label={label}
                        description={description}
                        classNames={{
                            switch: cns?.switch,
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

export const Switch = ({
    field,
    fieldState,
    checked,
    defaultChecked,
    onCheckedChange,
    disabled,
    required,
    size = "default",
    position = "start",
    variant = "default",
    id,
    name,
    label,
    description,
    className,
    classNames: cns,
    "aria-invalid": ariaInvalid,
}: SwitchProps) => {
    const isInvalid = ariaInvalid ?? fieldState?.invalid;
    const isChecked = field ? !!field.value : checked;
    const resolvedId = id ?? field?.name ?? name;

    const handleCheckedChange = (val: boolean) => {
        field?.onChange(val);
        onCheckedChange?.(val);
    };

    const switchEl = (
        <Switch$
            id={resolvedId}
            name={name ?? field?.name}
            checked={isChecked}
            defaultChecked={defaultChecked}
            onCheckedChange={handleCheckedChange}
            onBlur={field?.onBlur}
            disabled={disabled ?? field?.disabled}
            required={required}
            size={size}
            aria-invalid={isInvalid}
            className={cn("shrink-0", cns?.switch)}
        />
    );

    // ── Bare (no label/description) ──────────────────────────────────────────
    if (!label && !description) {
        return switchEl;
    }

    // ── Card variant ─────────────────────────────────────────────────────────
    // Uses shadcn FieldLabel > Field(horizontal) > FieldContent + switch.
    // FieldLabel automatically applies border+rounded when it wraps data-slot="field".
    if (variant === "card") {
        return (
            <FieldLabel
                htmlFor={resolvedId}
                className={cn(
                    "cursor-pointer select-none",
                    disabled && "pointer-events-none opacity-50",
                    cns?.root,
                    className,
                )}
            >
                <Field orientation="horizontal">
                    <FieldContent>
                        {label && (
                            <FieldTitle className={cn(cns?.label)}>
                                {label}
                            </FieldTitle>
                        )}
                        {description && (
                            <FieldDescription className={cn(cns?.description)}>
                                {description}
                            </FieldDescription>
                        )}
                    </FieldContent>
                    {switchEl}
                </Field>
            </FieldLabel>
        );
    }

    // ── Default variant ──────────────────────────────────────────────────────

    const textContent = (
        <div className={cn("flex flex-1 min-w-0 flex-col leading-snug", !!description ? "gap-1" : "gap-0")}>
            {label && (
                <FieldLabel
                    htmlFor={resolvedId}
                    className={cn("cursor-pointer text-sm font-medium leading-none", cns?.label)}
                >
                    {label}
                </FieldLabel>
            )}
            {description && (
                <p className={cn("text-xs text-muted-foreground", cns?.description)}>
                    {description}
                </p>
            )}
        </div>
    );

    const isEnd = position === "end";

    return (
        <div
            className={cn(
                switchRowVariants({ position }),
                !!description && !isEnd && "items-start",
                className,
                cns?.root,
            )}
        >
            {isEnd ? (
                <>
                    {textContent}
                    {switchEl}
                </>
            ) : (
                <>
                    {switchEl}
                    {textContent}
                </>
            )}
        </div>
    );
};
