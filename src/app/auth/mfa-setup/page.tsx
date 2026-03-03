import type { Metadata } from "next";
import MfaSetup from "@/features/auth/sections/mfa-setup";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
    title: "MFA Setup | EduPortal",
    description: "Set up two-factor authentication for your account",
};

export default function Page() {
    return (
        <MfaSetup
            header={{
                title: "Set up two-factor authentication",
                description: "Add an extra layer of security to your account",
            }}
            options={[
                {
                    icon: "smartphone",
                    title: "Authenticator App",
                    description: "Use an authenticator app like Google Authenticator",
                    disabled: true,
                },
                {
                    icon: "mail",
                    title: "Email Verification",
                    description: "Receive a verification code via email",
                    disabled: true,
                },
            ]}
            comingSoonMessage="MFA setup will be available in a future update."
            footer={{
                href: ROUTES.dashboard.home,
                label: "Skip for now",
            }}
        />
    );
}
