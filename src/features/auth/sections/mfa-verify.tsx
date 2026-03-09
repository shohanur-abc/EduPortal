"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ShieldCheckIcon } from "lucide-react";
import { Form } from "@/components/molecules/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import AuthCard, { FooterLink } from "../components/auth-card";
import { OtpField } from "../components/otp-field";
import { mfaVerifySchema, type MfaVerifyInput } from "@/schemas/auth";

// ============= MAIN COMPONENT =============
export default function MfaVerify({ header, submitLabel, footer, backup }: IMfaVerifySection) {
    return (
        <AuthCard
            title={header.title}
            description={header.description}
            footer={<FooterLink {...footer} />}
        >
            <div className="space-y-6">
                <SecurityIcon />
                <MfaVerifyForm submitLabel={submitLabel} backup={backup} />
            </div>
        </AuthCard>
    );
}

// ============= CHILD COMPONENTS =============
const SecurityIcon = () => (
    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
        <ShieldCheckIcon className="size-6 text-primary" />
    </div>
);

const MfaVerifyForm = ({ submitLabel, backup }: {
    submitLabel: string;
    backup: { prompt: string; label: string };
}) => {
    const form = useForm<MfaVerifyInput>({
        resolver: zodResolver(mfaVerifySchema),
        defaultValues: { code: "" },
    });

    const onSubmit = async (data: MfaVerifyInput) => {
        // TODO: Implement MFA verification
        toast.info("MFA verification is not yet implemented");
        console.log("MFA code:", data.code);
    };

    return (
        <Form form={form} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <>
                <OtpField name="code" control={form.control} />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Spinner className="mr-2" />}
                    {submitLabel}
                </Button>
                <BackupCodePrompt {...backup} />
            </>
        </Form>
    );
};

const BackupCodePrompt = ({ prompt, label }: { prompt: string; label: string }) => (
    <p className="text-center text-sm text-muted-foreground">
        {prompt}{" "}
        <button
            type="button"
            className="text-primary hover:underline font-medium"
            onClick={() => toast.info("Use a backup code to sign in")}
        >
            {label}
        </button>
    </p>
);

// ============= TYPES =============
interface IMfaVerifySection {
    header: { title: string; description: string };
    submitLabel: string;
    footer: { href: string; label: string };
    backup: { prompt: string; label: string };
}
