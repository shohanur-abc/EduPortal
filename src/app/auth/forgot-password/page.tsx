import type { Metadata } from "next";
import ForgotPassword from "@/features/auth/sections/forgot-password";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
    title: "Forgot Password | EduPortal",
    description: "Reset your EduPortal password",
};

export default function Page() {
    return (
        <ForgotPassword
            header={{
                default: {
                    title: "Forgot password?",
                    description: "Enter your email and we'll send you a reset link",
                },
                sent: {
                    title: "Check your email",
                    description: "We've sent a password reset link to your email",
                },
            }}
            email={{
                name: "email",
                label: "Email",
                placeholder: "Enter your email address",
            }}
            submitLabel="Send reset link"
            sentMessage="Didn't receive the email? Check your spam folder or try again with a different email address."
            footer={{
                href: ROUTES.auth.login,
                label: "\u2190 Back to sign in",
            }}
        />
    );
}
