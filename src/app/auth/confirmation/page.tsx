import type { Metadata } from "next";
import Confirmation from "@/features/auth/sections/confirmation";

export const metadata: Metadata = {
    title: "Account Created | EduPortal",
    description: "Your EduPortal account has been created",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
    const { email } = await searchParams;
    return (
        <Confirmation
            email={email}
            header={{
                title: "Account created!",
                description: "Your account has been created successfully",
            }}
            notice={{
                title: "Verify your email",
                description: "We've sent a verification code to {email}. Please check your inbox.",
            }}
            actions={{
                verify: "Verify email",
                signIn: "Go to sign in",
            }}
            footer="Didn't receive an email? Check your spam folder."
        />
    );
}
