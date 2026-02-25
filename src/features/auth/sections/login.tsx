"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import React from "react";
import { Email, Password } from "@/components/molecules/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema, type LoginInput } from "../validators/auth";
import { login } from "../actions";
import { Checkbox } from "@/components/molecules/checkbox";
import { FormCard } from "../components/form";

export default function Login({ header, footer, email, password, rememberMe, forgotPassword, socialLogin }: LoginProps) {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "", rememberMe: true },
    });

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
        <FormCard header={header} footer={footer} socialLogin={socialLogin} form={form} onSubmit={form.handleSubmit(onSubmit)}>
            <Email {...email} />
            <Password {...password} />
            <div className="flex items-center justify-between">
                <Checkbox {...rememberMe} />
                <Link href={forgotPassword.href} className="text-sm text-primary hover:underline" >
                    {forgotPassword.label}
                </Link>
            </div>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting} >
                {form.formState.isSubmitting && (<Spinner className="mr-2" />)}
                Sign in
            </Button>
        </FormCard>
    );
}







// ============= TYPES =============
interface LoginProps {
    header: {
        title: string;
        description: string;
    }
    footer: {
        description: string;
        cta: {
            href: string;
            label: string;
        }
    }
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
    socialLogin?: ('google' | 'facebook' | 'x')[];
}