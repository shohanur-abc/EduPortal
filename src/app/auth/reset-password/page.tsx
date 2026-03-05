import type { Metadata } from "next";
import ResetPassword from "@/features/auth/sections/reset-password";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
    title: "Reset Password | EduPortal",
    description: "Set a new password for your EduPortal account",
};

export default function Page() {
    return (
        <ResetPassword
            header={{
                title: "Reset password",
                description: "Enter your new password below",
            }}
            password={{
                name: "password",
                label: "New Password",
                placeholder: "Enter your new password",
            }}
            confirmPassword={{
                name: "confirmPassword",
                label: "Confirm Password",
                placeholder: "Re-enter your new password",
            }}
            requirements={[
                "At least 8 characters",
                "At least one letter",
                "At least one number",
                "At least one special character",
            ]}
            submitLabel="Reset password"
            footer={{
                href: ROUTES.auth.login,
                label: "← Back to sign in",
            }}
            invalidToken={{
                title: "Invalid or missing reset token.",
                description: "Please request a new password reset link.",
            }}
        />
    );
}
