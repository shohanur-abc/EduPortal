"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2Icon } from "lucide-react";
import { Form } from "@/components/molecules/form";
import { Email } from "@/components/molecules/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import AuthCard, { FooterLink } from "../components/auth-card";
import { forgotPasswordSchema, type ForgotPasswordInput } from "../validators/auth";
import { forgotPassword } from "../actions";

// ============= MAIN COMPONENT =============
export default function ForgotPassword({ header, email, submitLabel, sentMessage, footer }: IForgotPasswordSection) {
    const [sent, setSent] = useState(false);

    return (
        <AuthCard
            title={sent ? header.sent.title : header.default.title}
            description={sent ? header.sent.description : header.default.description}
            footer={<FooterLink {...footer} />}
        >
            {sent
                ? <SentContent message={sentMessage} />
                : <ForgotPasswordForm email={email} submitLabel={submitLabel} onSuccess={() => setSent(true)} />
            }
        </AuthCard>
    );
}

// ============= CHILD COMPONENTS =============
const SentContent = ({ message }: { message: string }) => (
    <div className="space-y-4 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2Icon className="size-6 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
    </div>
);

const ForgotPasswordForm = ({ email, submitLabel, onSuccess }: {
    email: React.ComponentProps<typeof Email>;
    submitLabel: string;
    onSuccess: () => void;
}) => {
    const form = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (data: ForgotPasswordInput) => {
        const result = await forgotPassword(data);
        if (result.success) {
            onSuccess();
        } else {
            toast.error(result.message);
        }
    };

    return (
        <Form form={form} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <>
                <Email {...email} />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Spinner className="mr-2" />}
                    {submitLabel}
                </Button>
            </>
        </Form>
    );
};

// ============= TYPES =============
interface IForgotPasswordSection {
    header: {
        default: { title: string; description: string };
        sent: { title: string; description: string };
    };
    email: React.ComponentProps<typeof Email>;
    submitLabel: string;
    sentMessage: string;
    footer: { href: string; label: string };
}
