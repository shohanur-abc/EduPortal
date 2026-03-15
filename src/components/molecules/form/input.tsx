"use client";
import { Controller, useFormContext } from 'react-hook-form';
import { InputGroup, InputGroupAddon, InputGroupInput, } from '@/components/ui/input-group';
import { Field, FieldLabel, FieldDescription, FieldError, } from '@/components/ui/field';
import { Input as Input$ } from '@/components/ui/input';
import { FormInputProps, InputProps } from './types';
import { cn } from '@/lib/utils';
import { Fragment } from 'react/jsx-runtime';

export const FormInput = ({ name = "", rules, ...props }: FormInputProps) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                < Input field={field} fieldState={fieldState} {...props} />
            )
            }
        />
    );
};


export const Input = ({ field, fieldState, name, label, description, leftAddon, rightAddon, className, classNames: cns, ...props }: InputProps) => {
    const Comp = label || description ? Field : Fragment;
    return (
        (label || leftAddon || rightAddon) ? (
            <Comp {...(label || description ? { label, description, className: cn(cns?.field) } : {})} >
                {label && <FieldLabel htmlFor={name} className={cns?.label}>{label}</FieldLabel>}
                <InputGroup data-invalid={fieldState?.invalid} className={cn(cns?.group)}>
                    {leftAddon && (<InputGroupAddon align="inline-start" className={cns?.leftAddon}>{leftAddon}</InputGroupAddon>)}
                    <InputGroupInput {...field}{...props} aria-invalid={fieldState?.invalid} className={cn(className, cns?.input)} />
                    {rightAddon && (<InputGroupAddon align="inline-end" className={cns?.rightAddon}>{rightAddon}</InputGroupAddon>)}
                </InputGroup>
                {description && <FieldDescription className={cns?.description}>{description}</FieldDescription>}
                {fieldState?.invalid && <FieldError errors={[fieldState.error]} className={cns?.error} />}
            </Comp>
        ) : (
            <Input$ {...field}{...props} aria-invalid={fieldState?.invalid} className={cn(className, cns?.input)} />
        ))
}
