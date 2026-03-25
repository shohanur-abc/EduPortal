"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import React from "react";
import { DialogDrawer, Email, Password, AvatarMolecule, Dropdown } from "@/components/molecules";
import { Button } from "@/components/molecules";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema, type LoginInput } from "@/schemas/auth";
import { login, socialLogin as socialLogin$ } from "@/services/auth";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";
import { Form, FormCheckbox, Select } from "@/components/molecules/form";
import { cn } from "@/lib";
import { MoreHorizontal } from "lucide-react";

const QuickLogin = {
    admin: {
        email: "admin@example.com",
        password: "admin123"
    },
    student: {
        email: "student@example.com",
        password: "student123"
    },
    teacher: {
        email: "teacher@example.com",
        password: "teacher123"
    },
    principal: {
        email: "principal@example.com",
        password: "principal123"
    },
    false: {
        email: "",
        password: ""
    }
};


export const LoginPage = ({ eyebrow, title, description, features, socialProof, ...props }: LoginPageProps) => {
    return (
        <main className="grid grid-cols-1 @3xl:grid-cols-2 h-screen">
            <div className="flex flex-col justify-center items-start gap-6 px-12 border-r-2 pb-10 bg-secondary/20 ">
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
                                    <AvatarMolecule key={i} fallback={init} className="size-8 border-2 border-background ring-1 ring-border" classNames={{ fallback: cn("text-xs font-semibold", i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground") }} />
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground">{socialProof.text}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Section */}
            <div className="flex justify-center items-center relative">
                <div className="absolute inset-50 bg-primary/10 blur-2xl animate-pulse" />
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
    const [loginAs, setLoginAs] = React.useState<keyof typeof QuickLogin>('false');
    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: emailFromVerification || QuickLogin[loginAs].email || "",
            password: QuickLogin[loginAs].password || "",
            rememberMe: true,
        },
    });

    React.useEffect(() => {
        if (isVerified) {
            toast.success("Email verified! Please login with your password.");
        }
    }, [isVerified]);

    React.useEffect(() => {
        form.reset({
            email: QuickLogin[loginAs].email,
            password: QuickLogin[loginAs].password,
            rememberMe: true,
        });
    }, [loginAs, form]);

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
        <Card className="backdrop-blur-md bg-muted/40 @3xl:max-w-sm w-full pt-8 mx-auto">
            <CardHeader className="text-center">
                <h2 className="text-2xl font-semibold">{header.title}</h2>
                <p className="text-sm text-muted-foreground">{header.description}</p>
            </CardHeader>
            <CardContent>
                {socialLogin?.map(({ provider, icon }) => (
                    <form key={provider} action={socialLogin$.bind(null, provider)}>
                        <Button type="submit" variant="outline" className="w-full gap-2 mb-3" leftIcon={icon}>
                            Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
                        </Button>
                    </form>
                ))}
                <FieldSeparator className="my-3">Or continue with email</FieldSeparator>
                <Form form={form} className="space-y-3 mb-3" onSubmit={form.handleSubmit(onSubmit)}>
                    <Email {...email} classNames={{ label: 'sr-only' }} rightAddon={
                        <Dropdown
                            // defaultOpen={true}
                            trigger={
                                <Button variant="ghost" size="icon-sm" className="rounded-full" tooltip="Demo login" tooltipDefaultOpen>
                                    <MoreHorizontal className="size-4" />
                                </Button>
                            }
                            side="right" align="center"
                            items={[
                                {
                                    type: "group",
                                    label: "Login as",
                                    items: [
                                        { label: "Admin", value: "admin" },
                                        { label: "Teacher", value: "teacher" },
                                        { label: "Student", value: "student" },
                                        { label: "Principal", value: "principal" }
                                    ].map(item => ({ ...item, onClick: () => setLoginAs(item.value as keyof typeof QuickLogin) }))
                                },
                            ]}
                        />
                    }
                    />
                    <Password {...password} classNames={{ label: 'sr-only' }} />
                    <div className="flex items-center justify-between mb-5 text-muted-foreground has-checked:text-secondary-foreground">
                        <FormCheckbox {...rememberMe} className="flex-0 whitespace-nowrap" />
                        <Link href={forgotPassword.href} className="text-sm text-primary hover:underline">
                            {forgotPassword.label}
                        </Link>
                    </div>
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting} leftIcon={form.formState.isSubmitting ? <Spinner /> : undefined}>
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
                container: "sm:max-w-sm rounded-2xl p-0 bg-background/40 dark:bg-transparent  border border-muted/50",
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