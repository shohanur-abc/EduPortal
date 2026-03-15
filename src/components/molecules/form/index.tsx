"use client";

// ─── Form molecule exports ────────────────────────────────────────────────────
export { Input, FormInput } from './input';
export { Select, FormSelect } from './select';
export { Textarea, FormTextarea } from './textarea';
export { Checkbox, FormCheckbox } from './checkbox';
export { RadioGroup, FormRadioGroup } from './radio-group';
export { Switch, FormSwitch } from './switch';
export { Slider, FormSlider } from './slider';
export { DatePicker, FormDatePicker } from './date-picker';

// ─── Type exports ─────────────────────────────────────────────────────────────
export type {
    InputProps, FormInputProps,
    SelectOption, SelectOptionGroup, SelectProps, FormSelectProps,
    TextareaProps, FormTextareaProps,
    CheckboxProps, FormCheckboxProps,
    RadioOption, RadioGroupProps, FormRadioGroupProps,
    SwitchProps, FormSwitchProps,
    SliderProps, FormSliderProps,
    DatePickerProps, FormDatePickerProps,
} from './types';

// ─── Pre-built molecule shortcuts ────────────────────────────────────────────

import { Eye, EyeOff, Lock, Mail } from '@/lib/icon';
import { FormInput } from './input';
import { useState } from 'react';
import { FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { FormInputProps } from './types';
import { Button } from '@/components/ui/button';


interface FormProps<T extends FieldValues = FieldValues> extends React.FormHTMLAttributes<HTMLFormElement> {
    form: UseFormReturn<T>;
}

export const Form = <T extends FieldValues = FieldValues>({
    form,
    children,
    ...props
}: FormProps<T>) => {
    return (
        <FormProvider {...form}>
            <form {...props}>{children}</form>
        </FormProvider>
    );
}

export const Email = (props: FormInputProps) => (
    <FormInput
        type="email"
        placeholder="Enter your email"
        leftAddon={<Mail className="text-muted-foreground" />}
        {...props}
    />
);

export const Password = ({ name, label = "Password", ...props }: React.ComponentProps<typeof FormInput>) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <FormInput
            name={name}
            label={label}
            type={showPassword ? "text" : "password"}
            leftAddon={<Lock className="text-muted-foreground" />}
            rightAddon={
                <Button
                    type='button'
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-muted-foreground rounded-full"
                    variant="ghost"
                    size="icon-sm"
                >
                    {showPassword ? <EyeOff /> : <Eye />}
                </Button>
            }
            placeholder="Enter your password"
            {...props}
        />
    );
}
