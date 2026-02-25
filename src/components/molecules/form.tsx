import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form";

interface FormProps<T extends FieldValues = FieldValues>
    extends React.FormHTMLAttributes<HTMLFormElement> {
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