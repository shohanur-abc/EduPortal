"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FieldSeparator as Separator } from "@/components/ui/field";
import { Form } from "@/components/molecules/form";
import { DialogDrawer } from "@/components/molecules";
import { socialLogin as socialLogin$ } from "../actions";
import type { UseFormReturn, FieldValues } from "react-hook-form";

export const LoginModal = <T extends FieldValues = FieldValues>({
    header,
    children,
    footer,
    socialLogin,
    form,
    onSubmit,
}: LoginModalProps<T>) => {
    const router = useRouter();

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
                container: "sm:max-w-sm rounded-2xl p-0 gap-0",
                header: "text-center items-center space-y-2 mb-6",
                title: "text-2xl font-semibold",
                description: "text-sm text-muted-foreground text-center max-w-xs",
            }}
        >

            {/* Social login buttons */}
            {socialLogin && (
                <div className="space-y-3">
                    {socialLogin.map((provider) => (
                        <form key={provider} action={socialLogin$.bind(null, provider)}>
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-full gap-2 h-11 rounded-full border border-border/60 bg-secondary/40 hover:bg-secondary/80"
                            >
                                {ICONS[provider]}
                                Continue with{" "}
                                {provider.charAt(0).toUpperCase() + provider.slice(1)}
                            </Button>
                        </form>
                    ))}
                </div>
            )}

            {socialLogin && (
                <Separator className="my-0">or</Separator>
            )}

            {/* Email/password form */}
            <Form form={form} onSubmit={onSubmit} className="space-y-3">
                {children}
            </Form>

            {/* Footer */}
            <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                    {footer.description}{" "}
                    <Link
                        href={footer.cta?.href || "#"}
                        className="text-primary hover:underline font-medium"
                    >
                        {footer.cta?.label || "Sign up"}
                    </Link>
                </p>
            </div>
        </DialogDrawer>
    );
};

// ============= HELPERS =============
const ICONS = {
    google: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    ),
    facebook: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    ),
    x: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    ),
};

// ============= TYPES =============
interface LoginModalProps<T extends FieldValues = FieldValues> {
    form: UseFormReturn<T>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    header: {
        title: string;
        description?: string;
    };
    footer: {
        description: string;
        cta?: {
            label: string;
            href: string;
        };
    };
    socialLogin?: ("google" | "facebook" | "x")[];
    children: React.ReactNode;
}
