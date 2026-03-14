import { InputGroupInput } from "@/components/ui/input-group";
import { ControllerFieldState, ControllerRenderProps, FieldValues, RegisterOptions } from "react-hook-form";

// ============= Input Types =============

export interface InputProps extends React.ComponentPropsWithoutRef<typeof InputGroupInput> {
    name?: string;
    label?: string;
    placeholder?: string;
    description?: string;
    field?: ControllerRenderProps<FieldValues, string>
    fieldState?: ControllerFieldState;
    leftAddon?: React.ReactNode;
    rightAddon?: React.ReactNode;
    className?: string;
    classNames?: {
        field?: string;
        group?: string;
        label?: string;
        input?: string;
        description?: string;
        error?: string;
        leftAddon?: string;
        rightAddon?: string;
    }
}

export interface FormInputProps extends Omit<InputProps, "field" | "fieldState"> {
    name: string;
    rules?: RegisterOptions;
}

// ─── Shared aliases ───────────────────────────────────────────────────────────

type RHFField = ControllerRenderProps<FieldValues, string>;
type RHFFieldState = ControllerFieldState;

// ─── Select ───────────────────────────────────────────────────────────────────

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    icon?: React.ElementType;
    description?: string;
}

export interface SelectOptionGroup {
    label?: string;
    options: SelectOption[];
}

export interface SelectProps {
    label?: string;
    description?: string;
    options?: SelectOption[];
    groups?: SelectOptionGroup[];
    placeholder?: string;
    size?: "sm" | "default";
    disabled?: boolean;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    required?: boolean;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    field?: RHFField;
    fieldState?: RHFFieldState;
    id?: string;
    name?: string;
    className?: string;
    classNames?: {
        field?: string
        trigger?: string;
        content?: string;
        item?: string;
        label?: string;
        description?: string;
        error?: string;
        separator?: string;
    };
    children?: React.ReactNode;
    "aria-invalid"?: boolean;
}

export interface FormSelectProps extends SelectProps {
    name: string;
    rules?: RegisterOptions;
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

export interface TextareaProps extends Omit<React.ComponentProps<"textarea">, "onChange"> {
    field?: RHFField;
    fieldState?: RHFFieldState;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    "aria-invalid"?: boolean;
    className?: string;
    showCount?: boolean;
    classNames?: {
        root?: string;
        textarea?: string;
        counter?: string;
    };
}

export interface FormTextareaProps extends Omit<TextareaProps, "field" | "fieldState" | "classNames"> {
    name: string;
    label?: string;
    description?: string;
    className?: string;
    rules?: RegisterOptions;
    classNames?: {
        field?: string;
        label?: string;
        description?: string;
        error?: string;
        textarea?: string;
        counter?: string;
    };
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

export interface CheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    required?: boolean;
    id?: string;
    name?: string;
    value?: string;
    field?: RHFField;
    fieldState?: RHFFieldState;
    label?: React.ReactNode;
    description?: React.ReactNode;
    className?: string;
    classNames?: {
        root?: string;
        checkbox?: string;
        label?: string;
        description?: string;
    };
    "aria-invalid"?: boolean;
}

export interface FormCheckboxProps extends Omit<CheckboxProps, "field" | "fieldState" | "classNames"> {
    name: string;
    label?: React.ReactNode;
    description?: React.ReactNode;
    className?: string;
    rules?: RegisterOptions;
    classNames?: {
        field?: string;
        label?: string;
        description?: string;
        error?: string;
        checkbox?: string;
    };
}

// ─── Radio Group ──────────────────────────────────────────────────────────────

export interface RadioOption {
    value: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
}

export interface RadioGroupProps {
    options: RadioOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    required?: boolean;
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "card" | "button";
    field?: RHFField;
    fieldState?: RHFFieldState;
    id?: string;
    name?: string;
    className?: string;
    classNames?: {
        root?: string;
        item?: string;
        label?: string;
        description?: string;
    };
    "aria-invalid"?: boolean;
}

export interface FormRadioGroupProps extends Omit<RadioGroupProps, "field" | "fieldState" | "classNames"> {
    name: string;
    label?: string;
    description?: string;
    className?: string;
    rules?: RegisterOptions;
    classNames?: {
        field?: string;
        label?: string;
        description?: string;
        error?: string;
        root?: string;
        item?: string;
        itemLabel?: string;
    };
}

// ─── Switch ───────────────────────────────────────────────────────────────────

export interface SwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    required?: boolean;
    size?: "sm" | "default";
    /** position="start": switch left, label right (inline). position="end": label left fills space, switch right (settings row). */
    position?: "start" | "end";
    /** variant="card": bordered clickable card via shadcn FieldLabel wrapping. variant="default": plain row. */
    variant?: "default" | "card";
    id?: string;
    name?: string;
    field?: RHFField;
    fieldState?: RHFFieldState;
    label?: React.ReactNode;
    description?: React.ReactNode;
    className?: string;
    classNames?: {
        root?: string;
        switch?: string;
        label?: string;
        description?: string;
    };
    "aria-invalid"?: boolean;
}

export interface FormSwitchProps extends Omit<SwitchProps, "field" | "fieldState" | "classNames"> {
    name: string;
    label?: React.ReactNode;
    description?: React.ReactNode;
    className?: string;
    rules?: RegisterOptions;
    classNames?: {
        field?: string;
        label?: string;
        description?: string;
        error?: string;
        switch?: string;
    };
}

// ─── Slider ───────────────────────────────────────────────────────────────────

export interface SliderProps {
    value?: number[];
    defaultValue?: number[];
    onValueChange?: (value: number[]) => void;
    onValueCommit?: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    field?: RHFField;
    fieldState?: RHFFieldState;
    id?: string;
    name?: string;
    className?: string;
    showValue?: boolean;
    showRange?: boolean;
    formatValue?: (value: number) => string;
    "aria-invalid"?: boolean;
}

export interface FormSliderProps extends Omit<SliderProps, "field" | "fieldState"> {
    name: string;
    label?: string;
    description?: string;
    className?: string;
    rules?: RegisterOptions;
    classNames?: {
        field?: string;
        label?: string;
        description?: string;
        error?: string;
        slider?: string;
    };
}

// ─── Date Picker ──────────────────────────────────────────────────────────────

export interface DatePickerProps {
    value?: Date;
    defaultValue?: Date;
    onChange?: (date: Date | undefined) => void;
    disabled?: boolean;
    placeholder?: string;
    dateFormat?: Intl.DateTimeFormatOptions;
    fromDate?: Date;
    toDate?: Date;
    field?: RHFField;
    fieldState?: RHFFieldState;
    id?: string;
    name?: string;
    size?: "sm" | "default";
    clearable?: boolean;
    className?: string;
    classNames?: {
        trigger?: string;
        content?: string;
    };
    "aria-invalid"?: boolean;
}

export interface FormDatePickerProps extends Omit<DatePickerProps, "field" | "fieldState"> {
    name: string;
    label?: string;
    description?: string;
    className?: string;
    rules?: RegisterOptions;
    classNames?: {
        field?: string;
        label?: string;
        description?: string;
        error?: string;
        trigger?: string;
        content?: string;
    };
}