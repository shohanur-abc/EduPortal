"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Slider as Slider$ } from "@/components/ui/slider";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { FormSliderProps, SliderProps } from "./types";
import { cn } from "@/lib/utils";

// ─── RHF-integrated version ──────────────────────────────────────────────────

export const FormSlider = ({
    name = "",
    label,
    description,
    className,
    classNames: cns,
    rules,
    ...props
}: FormSliderProps) => {
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
                    <Slider
                        {...props}
                        field={field}
                        fieldState={fieldState}
                        className={cns?.slider}
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

export const Slider = ({
    field,
    fieldState: _fieldState,
    value,
    defaultValue,
    onValueChange,
    onValueCommit,
    min = 0,
    max = 100,
    step = 1,
    disabled,
    orientation,
    showValue = false,
    showRange = false,
    formatValue,
    className,
    "aria-invalid": _ariaInvalid,
    ...rest
}: SliderProps) => {
    // RHF stores slider as number[] (or a single number wrapped in array)
    const controlledValue: number[] | undefined = field
        ? Array.isArray(field.value)
            ? field.value
            : field.value !== undefined && field.value !== ""
                ? [Number(field.value)]
                : undefined
        : value;

    const handleValueChange = (vals: number[]) => {
        field?.onChange(vals);
        onValueChange?.(vals);
    };

    const fmt = (v: number) => (formatValue ? formatValue(v) : String(v));

    // For range sliders (2+ thumbs) show all values; for single, show one
    const valueDisplay = controlledValue?.length
        ? controlledValue.length > 1
            ? controlledValue.map(fmt).join(" – ")
            : fmt(controlledValue[0])
        : undefined;

    return (
        <div className={cn("flex w-full flex-col gap-2")}>
            {showValue && valueDisplay !== undefined && (
                <div className="flex justify-end text-sm font-medium tabular-nums text-muted-foreground">
                    {valueDisplay}
                </div>
            )}
            <Slider$
                {...rest}
                value={controlledValue}
                defaultValue={defaultValue}
                onValueChange={handleValueChange}
                onValueCommit={(vals) => {
                    field?.onBlur();
                    onValueCommit?.(vals);
                }}
                min={min}
                max={max}
                step={step}
                disabled={disabled ?? field?.disabled}
                orientation={orientation}
                name={field?.name}
                className={className}
            />
            {showRange && (
                <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
                    <span>{fmt(min)}</span>
                    <span>{fmt(max)}</span>
                </div>
            )}
        </div>
    );
};
