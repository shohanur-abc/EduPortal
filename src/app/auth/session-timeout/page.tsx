import type { Metadata } from "next";
import SessionTimeoutSection from "@/features/auth/sections/session-timeout";

export const metadata: Metadata = {
    title: "Session Expired | EduPortal",
    description: "Your session has expired",
};

export default function Page() {
    return (
        <SessionTimeoutSection
            header={{
                title: "Session Expired",
                description: "Your session has timed out due to inactivity",
            }}
            countdownText="Redirecting to sign in page in"
            actions={{
                signIn: "Sign in again",
                signOut: "Sign out",
            }}
        />
    );
}
