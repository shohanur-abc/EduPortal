import type { Metadata } from "next";
import MfaVerify from "@/features/auth/sections/mfa-verify";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
    title: "MFA Verification | EduPortal",
    description: "Enter your two-factor authentication code",
};

export default function Page() {
    return (
        <MfaVerify
            header={{
                title: "Two-factor authentication",
                description: "Enter the 6-digit code from your authenticator app",
            }}
            submitLabel="Verify"
            footer={{
                href: ROUTES.auth.login,
                label: "← Back to sign in",
            }}
            backup={{
                prompt: "Having trouble?",
                label: "Use a backup code",
            }}
        />
    );
}
