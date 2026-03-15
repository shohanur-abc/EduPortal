import type { Metadata } from "next";
import Unauthorized from "@/features/auth/sections/unauthorized";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
    title: "Unauthorized | EduPortal ",
    description: "You don't have permission to access this page",
};

export default function Page() {
    return (
        <Unauthorized
            header={{
                title: "Access Denied",
                description: "You don't have permission to access this page",
            }}
            message="You don't have the required permissions to view this resource. If you believe this is an error, please contact your administrator."
            actions={[
                { href: ROUTES.dashboard.home, label: "Go to Dashboard" },
                { href: ROUTES.marketing.contact, label: "Contact Support", variant: "outline" },
            ]}
            footer={{
                href: ROUTES.auth.login,
                label: "Sign in with a different account",
            }}
        />
    );
}
