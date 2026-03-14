"use client";
import { InputGroup, InputGroupAddon, InputGroupInput, } from '@/components/ui/input-group';
import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldLabel, FieldDescription, FieldError, } from '@/components/ui/field';
import { Eye, EyeOff, Lock, Mail } from '@/lib/icon';
import { Button } from '../ui/button';
import { useState } from 'react';

export const FormInput = ({ name = "", label, description, placeholder, type = 'text', leftAddon, rightAddon, ...props }: FormInputProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>{label}</FieldLabel>
                    <InputGroup data-invalid={fieldState.invalid}>
                        {leftAddon && (
                            <InputGroupAddon align="inline-start">
                                {leftAddon}
                            </InputGroupAddon>
                        )}
                        <InputGroupInput
                            {...field}
                            {...props}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            aria-invalid={fieldState.invalid}
                        />
                        {rightAddon && (
                            <InputGroupAddon align="inline-end">
                                {rightAddon}
                            </InputGroupAddon>
                        )}
                    </InputGroup>
                    {description && <FieldDescription>{description}</FieldDescription>}
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
};


export const Email = (props: React.ComponentProps<typeof FormInput>) => (
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
                    className="text-muted-foreground"
                    variant="ghost"
                    size="icon"
                >
                    {showPassword ? <EyeOff /> : <Eye />}
                </Button>
            }
            placeholder="Enter your password"
            {...props}
        />
    );
}


// ============= Types =============
interface FormInputProps extends React.ComponentProps<typeof InputGroupInput> {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    description?: string;
    leftAddon?: React.ReactNode;
    rightAddon?: React.ReactNode;
}