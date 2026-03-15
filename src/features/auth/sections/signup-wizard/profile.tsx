import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ISignupWizard } from "../signup-wizard";
import { Camera, Check } from "lucide-react";
import { FormInput } from "@/components/molecules";
import { SignupInput } from "@/schemas/auth/signup";

export const ProfilePanel = ({ config }: { config: ISignupWizard["config"]["profile"] }) => {
    const form = useFormContext<SignupInput>();
    const fileRef = useRef<HTMLInputElement>(null);
    const avatar = form.watch("avatar");
    const firstName = form.watch("firstName");
    const lastName = form.watch("lastName");
    const initials = [firstName[0], lastName[0]].filter(Boolean).join("").toUpperCase() || "?";

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => form.setValue("avatar", reader.result as string, { shouldValidate: true });
        reader.readAsDataURL(file);
    };

    return (
        <div className="w-full max-w-md space-y-5">
            <div className="space-y-1.5">
                <h2 className="text-2xl font-bold tracking-tight">{config.title}</h2>
                <p className="text-muted-foreground text-sm">{config.description}</p>
            </div>

            <div className="flex flex-col items-center gap-2">
                <button type="button" onClick={() => fileRef.current?.click()} className="group relative">
                    <Avatar className="size-20 border-2 border-border group-hover:border-primary transition-colors">
                        <AvatarImage src={avatar} alt="Profile" />
                        <AvatarFallback className="text-xl font-semibold bg-muted">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center border-2 border-background">
                        <Camera className="size-3" />
                    </span>
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                <p className="text-xs text-muted-foreground">Click to upload a photo</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormInput name="firstName" label="First Name" placeholder="John" />
                <FormInput name="lastName" label="Last Name" placeholder="Doe" />
            </div>

            <UsernameField />

            <FormInput name="dateOfBirth" label="Date of Birth" type="date" placeholder="YYYY-MM-DD" />

            <Controller
                name="gender"
                control={form.control as ReturnType<typeof useFormContext<SignupInput>>["control"]}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Gender <span className="text-destructive">*</span></FieldLabel>
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-6 mt-1">
                            {GENDER_OPTIONS.map(({ value, label }) => (
                                <label key={value} className="flex items-center gap-2 cursor-pointer text-sm">
                                    <RadioGroupItem value={value} />
                                    {label}
                                </label>
                            ))}
                        </RadioGroup>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </div>
    );
};




const UsernameField = () => {
    const { watch } = useFormContext<SignupInput>();
    const username = watch("username") ?? "";
    const isValid = username.length >= 3 && /^[a-z0-9_-]+$/.test(username);

    return (
        <FormInput
            name="username"
            label="Username"
            placeholder="john-doe"
            rightAddon={isValid ? <Check className="size-4 text-emerald-500" /> : undefined}
        />
    );
};


const GENDER_OPTIONS = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
];