import { Controller, useFormContext } from "react-hook-form";
import { Checkbox as CB } from "../ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Checkbox = ({ name, label, description, className, classNames: cns, ...props }: CheckboxProps) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field orientation="horizontal" className={cn('w-fit', cns?.field)} data-invalid={fieldState.invalid}>
                    <CB
                        {...field}
                        {...props}
                        onCheckedChange={(checked) => field.onChange(checked)}
                        checked={field.value}
                        id={name}
                        className={className}
                        aria-invalid={fieldState.invalid}
                    />
                    <FieldContent className={cns?.content}>
                        <FieldLabel htmlFor={name} className={cns?.label}>{label}</FieldLabel>
                        {description && <FieldDescription className={cns?.description}>{description}</FieldDescription>}
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className={cns?.error} />}
                    </FieldContent>
                </Field>
            )}
        />
    );
}


// ============= Types =============
export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CB> {
    name: string;
    label: ReactNode;
    description?: ReactNode;
    className?: string;
    classNames?: {
        field?: string;
        content?: string;
        label?: string;
        description?: string;
        error?: string;
    };
};