"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, XIcon } from "@/lib/icon";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { DatePickerProps, FormDatePickerProps } from "./types";
import { cn } from "@/lib/utils";

// ─── RHF-integrated version ──────────────────────────────────────────────────

export const FormDatePicker = ({
    name = "",
    label,
    description,
    className,
    classNames: cns,
    rules,
    ...props
}: FormDatePickerProps) => {
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
                    <DatePicker
                        {...props}
                        id={name}
                        field={field}
                        fieldState={fieldState}
                        classNames={{
                            trigger: cns?.trigger,
                            content: cns?.content,
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

export const DatePicker = ({
    field,
    fieldState,
    value,
    defaultValue,
    onChange,
    disabled,
    placeholder = "Pick a date",
    dateFormat = { month: "long", day: "numeric", year: "numeric" },
    fromDate,
    toDate,
    id,
    size,
    clearable = false,
    className,
    classNames: cns,
    "aria-invalid": ariaInvalid,
}: DatePickerProps) => {
    const [open, setOpen] = React.useState(false);
    const isInvalid = ariaInvalid ?? fieldState?.invalid;

    // Resolve the current date value
    const currentValue: Date | undefined = field
        ? field.value instanceof Date
            ? field.value
            : field.value
                ? new Date(field.value)
                : undefined
        : value;

    const [internalDate, setInternalDate] = React.useState<Date | undefined>(
        currentValue ?? defaultValue
    );

    const displayDate = currentValue ?? internalDate;

    const handleSelect = (date: Date | undefined) => {
        setInternalDate(date);
        field?.onChange(date);
        onChange?.(date);
        setOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleSelect(undefined);
    };

    const formattedDate = displayDate
        ? format(displayDate, "PPP")
        : undefined;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    type="button"
                    variant="outline"
                    data-size={size}
                    disabled={disabled ?? field?.disabled}
                    aria-invalid={isInvalid}
                    onBlur={field?.onBlur}
                    className={cn(
                        "w-full justify-start gap-2 text-left font-normal",
                        !displayDate && "text-muted-foreground",
                        isInvalid &&
                        "border-destructive ring-3 ring-destructive/20 dark:ring-destructive/40",
                        className,
                        cns?.trigger
                    )}
                >
                    <CalendarIcon className="size-4 shrink-0 opacity-50" />
                    <span className="flex-1">{formattedDate ?? placeholder}</span>
                    {clearable && displayDate && (
                        <span
                            role="button"
                            tabIndex={0}
                            aria-label="Clear date"
                            onClick={handleClear}
                            onKeyDown={(e) => e.key === "Enter" && handleClear(e as never)}
                            className="ml-auto opacity-60 hover:opacity-100 transition-opacity"
                        >
                            <XIcon className="size-3.5" />
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={cn("w-auto p-0", cns?.content)}
                align="start"
            >
                <Calendar
                    mode="single"
                    selected={displayDate}
                    onSelect={handleSelect}
                    disabled={disabled ? () => true : undefined}
                    fromDate={fromDate}
                    toDate={toDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};
