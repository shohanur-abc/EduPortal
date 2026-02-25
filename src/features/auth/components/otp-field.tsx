import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp";

// ============= MAIN COMPONENT =============
export const OtpField = <T extends FieldValues>({ name, control }: IOtpField<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
                <div className="flex justify-center">
                    <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-center" />
                )}
            </Field>
        )}
    />
);

// ============= TYPES =============
interface IOtpField<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
}
