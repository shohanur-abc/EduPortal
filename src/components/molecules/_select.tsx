import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Select as Select$, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

export const Select = ({ name, label, placeholder, description, className, classNames: cns, options, ...props }: SelectProps) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={cn(className, cns?.field)}>
                    <FieldLabel>{label}</FieldLabel>
                    <Select$ value={field.value} onValueChange={field.onChange} {...props}>
                        <SelectTrigger className={cn("w-full", cns?.trigger)} data-invalid={fieldState.invalid}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options?.map(({ value, label }, i) => (
                                <SelectItem key={i} value={value || label.toLocaleLowerCase().replace(/\s+/g, "-")} className={cns?.item}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select$>
                    {description && <FieldDescription className={cns?.description}>{description}</FieldDescription>}
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />
                    }
                </Field>
            )}
        />
    );
}


// ============= Types =============
export interface SelectProps extends React.ComponentPropsWithoutRef<typeof Select$> {
    name: string;
    label: ReactNode;
    placeholder?: string;
    description?: ReactNode;
    options?: { value?: string; label: string }[];
    className?: string;
    classNames?: {
        field?: string;
        trigger?: string;
        item: string;
        label?: string;
        description?: string;
        error?: string;
    };
};