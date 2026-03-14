"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import React from "react";
import { DialogDrawer, Email, Password } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema, type LoginInput } from "@/schemas/auth";
import { login } from "../actions";
import { Checkbox } from "@/components/molecules";
import { LoginModal } from "../components/login-modal";
import { Form } from "@/components/molecules/form";
import { FieldSeparator } from "@/components/ui/field";
import { socialLogin2 } from "../actions/social-login";
import { Google } from "@/lib/icon";

export default function LoginDialog({ header, footer, email, password, rememberMe, forgotPassword, socialLogin }: LoginDialogProps) {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const emailFromVerification = searchParams.get("email") ?? "";
    const isVerified = searchParams.get("verified") === "true";
    const router = useRouter();
    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: emailFromVerification,
            password: "",
            rememberMe: true,
        },
    });

    React.useEffect(() => {
        if (isVerified) {
            toast.success("Email verified! Please login with your password.");
        }
    }, [isVerified]);

    const onSubmit = async (data: LoginInput) => {
        const result = await login({
            email: data.email,
            password: data.password,
            callbackUrl: callbackUrl || undefined,
        });
        if (result && !result.success) {
            toast.error(result.message);
        }
    };

    return (
        <DialogDrawer
            trigger={<div className="hidden" />}
            title={header.title}
            description={header.description}
            open
            closeOnOutsideClick={false}
            onOpenChange={(open) => {
                if (!open) router.back();
            }}
            className="space-y-6"
            classNames={{
                container: "sm:max-w-sm rounded-2xl p-8 gap-0",
                header: "text-center items-center space-y-2 mb-6",
                title: "text-2xl font-semibold",
                description: "text-sm text-muted-foreground text-center max-w-xs",
            }}
        >
            <form action={socialLogin2}>
                <input type="hidden" name="provider" value="google" />
                <Button type="submit" variant="outline" className="w-full gap-2 mb-3"><Google className="size-4" /> Continue with Google</Button>
            </form>
            <FieldSeparator className="my-3">Continue with</FieldSeparator>
            <Form form={form} className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                <Email {...email} classNames={{ label: 'sr-only' }} />
                <Password {...password} classNames={{ label: 'sr-only' }} />
                <div className="flex items-center justify-between mb-5 text-muted-foreground has-checked:text-secondary-foreground">
                    <Checkbox {...rememberMe} className="" />
                    <Link href={forgotPassword.href} className="text-sm text-primary hover:underline">
                        {forgotPassword.label}
                    </Link>
                </div>
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Spinner className="mr-2" />}
                    Continue
                </Button>
            </Form>
        </DialogDrawer>
        // <LoginModal header={header} footer={footer} socialLogin={socialLogin} form={form} onSubmit={form.handleSubmit(onSubmit)}>
        //     <Email {...email} classNames={{ label: 'sr-only' }} />
        //     <Password {...password} classNames={{ label: 'sr-only' }} />
        //     <div className="flex items-center justify-between">
        //         <Checkbox {...rememberMe} />
        //         <Link href={forgotPassword.href} className="text-sm text-primary hover:underline">
        //             {forgotPassword.label}
        //         </Link>
        //     </div>
        //     <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        //         {form.formState.isSubmitting && <Spinner className="mr-2" />}
        //         Continue
        //     </Button>
        // </LoginModal>
    );
}

// ============= TYPES =============
interface LoginDialogProps {
    header: {
        title: string;
        description: string;
    };
    footer: {
        description: string;
        cta: {
            href: string;
            label: string;
        };
    };
    email: React.ComponentProps<typeof Email>;
    password: React.ComponentProps<typeof Password>;
    rememberMe: {
        name: string;
        label: string;
    };
    forgotPassword: {
        href: string;
        label: string;
    };
    socialLogin?: ("google" | "facebook" | "x")[];
}
