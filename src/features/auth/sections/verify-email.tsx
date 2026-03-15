"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/molecules/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import AuthCard, { FooterLink } from "../components/auth-card";
import { OtpField } from "../components/otp-field";
import { ROUTES } from "@/lib/routes";
import { verifyEmailSchema, type VerifyEmailInput } from "@/schemas/auth";
import { verifyEmail } from "@/services/auth";

// ============= MAIN COMPONENT =============
export default function VerifyEmail({ header, submitLabel, footer, resend }: IVerifyEmailSection) {
    return (
        <AuthCard
            title={header.title}
            description={header.description}
            footer={<FooterLink {...footer} />}
        >
            <VerifyEmailForm submitLabel={submitLabel} resend={resend} />
        </AuthCard>
    );
}

// ============= CHILD COMPONENTS =============
const VerifyEmailForm = ({ submitLabel, resend }: {
    submitLabel: string;
    resend: { prompt: string; label: string };
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") ?? "";
    const [isRedirecting, setIsRedirecting] = useState(false);

    const form = useForm<VerifyEmailInput>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: { code: "", email },
    });

    const onSubmit = async (data: VerifyEmailInput) => {
        const result = await verifyEmail(data);
        if (result.success) {
            toast.success(result.message);
            toast.info("Please login with your email and password");
            setIsRedirecting(true);

            // Redirect to login page with pre-filled email
            setTimeout(() => {
                router.push(`${ROUTES.auth.login}?email=${encodeURIComponent(data.email)}&verified=true`);
            }, 1500);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <Form form={form} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <>
                <OtpField name="code" control={form.control} />
                <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting || isRedirecting}
                >
                    {(form.formState.isSubmitting || isRedirecting) && <Spinner className="mr-2" />}
                    {isRedirecting ? "Redirecting to login..." : submitLabel}
                </Button>
                <ResendPrompt {...resend} />
            </>
        </Form>
    );
};

const ResendPrompt = ({ prompt, label }: { prompt: string; label: string }) => (
    <p className="text-center text-sm text-muted-foreground">
        {prompt}{" "}
        <button
            type="button"
            className="text-primary hover:underline font-medium"
            onClick={() => toast.info("Verification code resent")}
        >
            {label}
        </button>
    </p>
);

// ============= TYPES =============
interface IVerifyEmailSection {
    header: { title: string; description: string };
    submitLabel: string;
    footer: { href: string; label: string };
    resend: { prompt: string; label: string };
}
