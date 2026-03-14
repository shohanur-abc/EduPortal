"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/molecules/form";
import { Password } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import AuthCard, { FooterLink } from "../components/auth-card";
import { ROUTES } from "@/lib/routes";
import { resetPasswordSchema, type ResetPasswordInput } from "@/schemas/auth";
import { resetPassword } from "../actions";

// ============= MAIN COMPONENT =============
export default function ResetPassword({ header, password, confirmPassword, requirements, submitLabel, footer, invalidToken }: IResetPasswordSection) {
    return (
        <AuthCard
            title={header.title}
            description={header.description}
            footer={<FooterLink {...footer} />}
        >
            <ResetPasswordForm
                password={password}
                confirmPassword={confirmPassword}
                requirements={requirements}
                submitLabel={submitLabel}
                invalidToken={invalidToken}
            />
        </AuthCard>
    );
}

// ============= CHILD COMPONENTS =============
const ResetPasswordForm = ({ password, confirmPassword, requirements, submitLabel, invalidToken }: {
    password: React.ComponentProps<typeof Password>;
    confirmPassword: React.ComponentProps<typeof Password>;
    requirements: string[];
    submitLabel: string;
    invalidToken: { title: string; description: string };
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") ?? "";

    const form = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { password: "", confirmPassword: "", token },
    });

    const onSubmit = async (data: ResetPasswordInput) => {
        const result = await resetPassword(data);
        if (result.success) {
            toast.success(result.message);
            router.push(ROUTES.auth.login);
        } else {
            toast.error(result.message);
        }
    };

    if (!token) {
        return (
            <div className="text-center space-y-2">
                <p className="text-sm text-destructive">{invalidToken.title}</p>
                <p className="text-sm text-muted-foreground">{invalidToken.description}</p>
            </div>
        );
    }

    return (
        <Form form={form} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Password {...password} />
            <Password {...confirmPassword} />
            <PasswordRequirements items={requirements} />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Spinner className="mr-2" />}
                {submitLabel}
            </Button>
        </Form>
    );
};

const PasswordRequirements = ({ items }: { items: string[] }) => (
    <ul className="text-xs text-muted-foreground space-y-1">
        {items.map((item, i) => (
            <li key={i}>• {item}</li>
        ))}
    </ul>
);

// ============= TYPES =============
interface IResetPasswordSection {
    header: { title: string; description: string };
    password: React.ComponentProps<typeof Password>;
    confirmPassword: React.ComponentProps<typeof Password>;
    requirements: string[];
    submitLabel: string;
    footer: { href: string; label: string };
    invalidToken: { title: string; description: string };
}
