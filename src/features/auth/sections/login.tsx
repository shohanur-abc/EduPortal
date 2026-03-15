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
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { socialLogin2 } from "../actions/social-login";
import { FieldSeparator } from "@/components/ui/field";
import { Form } from "@/components/molecules/form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib";


export const LoginPage = ({ eyebrow, title, description, features, socialProof, ...props }: LoginPageProps) => {
    return (
        <main className="grid grid-cols-1 @3xl:grid-cols-2 h-screen">
            <div className="flex flex-col justify-center items-start gap-6 px-12 border-r-2 mb-10">
                <div className="flex flex-col gap-5 max-w-lg mx-auto ">
                    <div className="space-y-4">
                        <p className="text-sm font-medium text-primary uppercase tracking-widest">{eyebrow}</p>
                        <h1 className="text-4xl font-bold leading-tight tracking-tight">{title}</h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
                    </div>
                    {features && (
                        <ul className="space-y-4">
                            {features.map(({ icon: Icon, title, desc }, i) => (
                                <li key={i} className="flex gap-4 items-start border rounded-xl p-4 bg-muted/30">
                                    <span className="mt-0.5 size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        {Icon}
                                    </span>
                                    <div>
                                        <p className="font-medium text-sm">{title}</p>
                                        <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {socialProof && (
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {socialProof.initials.map((init, i) => (
                                    <Avatar key={i} className="size-8 border-2 border-background ring-1 ring-border">
                                        <AvatarFallback className={cn("text-xs font-semibold", i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>
                                            {init}
                                        </AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground">{socialProof.text}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Section */}
            <div className="flex justify-center items-center">
                <LoginCard {...props} />
            </div>

        </main>
    )
}
export const LoginCard = ({ header, footer, email, password, rememberMe, forgotPassword, socialLogin }: LoginProps) => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const emailFromVerification = searchParams.get("email") ?? "";
    const isVerified = searchParams.get("verified") === "true";
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
        <Card className="backdrop-blur-md @3xl:max-w-sm w-full pt-8 mx-auto">
            <CardHeader className="text-center">
                <h2 className="text-2xl font-semibold">{header.title}</h2>
                <p className="text-sm text-muted-foreground">{header.description}</p>
            </CardHeader>
            <CardContent>
                <form action={socialLogin2}>
                    {socialLogin?.map(({ provider, icon }) => (
                        <Button key={provider} type="submit" variant="outline" className="w-full gap-2 mb-3">
                            {icon} Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
                        </Button>
                    ))}
                </form>
                <FieldSeparator className="my-3">Or continue with email</FieldSeparator>
                <Form form={form} className="space-y-3 mb-3" onSubmit={form.handleSubmit(onSubmit)}>
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
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground text-center -mt-5 block ">
                {footer.description}{" "}
                <Link href={footer.cta.href} className="text-primary hover:underline">
                    {footer.cta.label}
                </Link>
            </CardFooter>
        </Card>
    )
}


export default function LoginDialog(props: LoginProps) {
    const router = useRouter();
    return (
        <DialogDrawer
            trigger={<div className="hidden" />}
            open
            closeOnOutsideClick={false}
            onOpenChange={(open) => {
                if (!open) router.back();
            }}
            classNames={{
                container: "sm:max-w-sm rounded-2xl p-0 bg-transparent ",
            }}
        >
            <LoginCard {...props} />
        </DialogDrawer>
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
    socialLogin?: {
        provider: "google" | "github" | "facebook";
        icon: React.ReactNode;
        label: string;
    }[];
}


interface LoginPageProps extends LoginProps {
    eyebrow?: string;
    title: string;
    description: string;
    features?: {
        icon: React.ReactNode;
        title: string;
        desc: string;
    }[];
    socialProof?: {
        initials: string[];
        text: string;
    }
}