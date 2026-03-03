import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { ReactNode } from "react";
import { Switch as Switch$ } from "../ui/switch";

export const Switch = ({ name, label, description, className, classNames: cns, ...props }: SwitchProps) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field orientation="horizontal" className={cns?.field} data-invalid={fieldState.invalid}>
                    <FieldContent className={cns?.content}>
                        <FieldLabel htmlFor={name} className={cns?.label}>{label}</FieldLabel>
                        {description && <FieldDescription className={cns?.description}>{description}</FieldDescription>}
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className={cns?.error} />}
                    </FieldContent>
                    <Switch$
                        {...field}
                        {...props}
                        onCheckedChange={(checked) => field.onChange(checked)}
                        checked={field.value}
                        id={name}
                        className={className}
                        aria-invalid={fieldState.invalid}
                    />
                </Field>
            )}
        />
    );
}


// ============= Types =============
export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof Switch$> {
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