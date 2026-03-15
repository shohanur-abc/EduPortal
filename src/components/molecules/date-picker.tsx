"use client"

import * as React from "react"
import { format, parse } from "date-fns"
import { CalendarIcon } from "@/lib/icon"
import { Controller, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"

interface DatePickerProps {
    name: string
    label?: string
    description?: string
    placeholder?: string
    disabled?: boolean
    /** Date format for display (default: "PPP" → e.g. "June 15, 2025") */
    displayFormat?: string
    /** Value format for storage as string (default: "yyyy-MM-dd") */
    valueFormat?: string
    className?: string
}

/**
 * A form-integrated date picker molecule using shadcn Calendar + Popover.
 * Stores value as a formatted string (compatible with z.string() schemas).
 * Uses react-hook-form Controller via useFormContext.
 */
export function DatePicker({
    name,
    label,
    description,
    placeholder = "Pick a date",
    disabled = false,
    displayFormat = "PPP",
    valueFormat = "yyyy-MM-dd",
    className,
}: DatePickerProps) {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                // Convert string value → Date for Calendar
                const dateValue = field.value
                    ? parse(field.value, valueFormat, new Date())
                    : undefined
                const isValidDate = dateValue && !isNaN(dateValue.getTime())

                return (
                    <Field data-invalid={fieldState.invalid}>
                        {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id={name}
                                    type="button"
                                    variant="outline"
                                    disabled={disabled}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !isValidDate && "text-muted-foreground",
                                        fieldState.invalid && "border-destructive",
                                        className,
                                    )}
                                >
                                    <CalendarIcon className="mr-2 size-4 shrink-0" />
                                    {isValidDate
                                        ? format(dateValue, displayFormat)
                                        : <span>{placeholder}</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={isValidDate ? dateValue : undefined}
                                    onSelect={(date) => {
                                        // Convert Date → string for form storage
                                        field.onChange(date ? format(date, valueFormat) : "")
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {description && <FieldDescription>{description}</FieldDescription>}
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )
            }}
        />
    )
}
