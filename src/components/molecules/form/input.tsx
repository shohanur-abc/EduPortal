"use client";
import { Controller, useFormContext } from 'react-hook-form';
import { InputGroup, InputGroupAddon, InputGroupInput, } from '@/components/ui/input-group';
import { Field, FieldLabel, FieldDescription, FieldError, } from '@/components/ui/field';
import { Input as Input$ } from '@/components/ui/input';
import { FormInputProps, InputProps } from './types';
import { cn } from '@/lib/utils';

export const FormInput = ({ name = "", label, description, className, classNames: cns, rules, ...props }: FormInputProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={cn(className, cns?.field)} >
                    {label && <FieldLabel htmlFor={name} className={cns?.label}>{label}</FieldLabel>}
                    <Input  {...props} id={name} field={field} fieldState={fieldState} />
                    {description && <FieldDescription className={cns?.description}>{description}</FieldDescription>}
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} className={cns?.error} />}
                </Field>
            )}
        />
    );
};


export const Input = ({ field, fieldState, leftAddon, rightAddon, className, classNames: cns, ...props }: InputProps) => (
    (leftAddon || rightAddon) ? (
        <InputGroup data-invalid={fieldState?.invalid} className={cn(cns?.group)}>
            {leftAddon && (<InputGroupAddon align="inline-start" className={cns?.leftAddon}>
                {leftAddon}
            </InputGroupAddon>)}
            <InputGroupInput {...field}{...props} aria-invalid={fieldState?.invalid} className={cn(className, cns?.input)} />
            {rightAddon && (<InputGroupAddon align="inline-end" className={cns?.rightAddon}>
                {rightAddon}
            </InputGroupAddon>)}
        </InputGroup>
    ) : (
        <Input$ {...field}{...props} aria-invalid={fieldState?.invalid} className={cn(className, cns?.input)} />
    )
);

