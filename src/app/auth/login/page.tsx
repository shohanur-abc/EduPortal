import type { Metadata } from "next";
import Login from "@/features/auth/sections/login";
import ROUTES from "@/lib/routes";

export const metadata: Metadata = {
    title: "Sign In | EduPortal",
    description: "Sign in to your EduPortal account",
};

export default function Page() {
    return <Login
        header={{
            title: "Welcome back",
            description: "Please enter your credentials to access your account"
        }}
        email={{
            name: "email",
            label: "Email",
            placeholder: "Enter your email address",
        }}
        password={{
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
        }}
        rememberMe={{
            name: "rememberMe",
            label: "Remember me"
        }}
        forgotPassword={{
            label: "Forgot password?",
            href: ROUTES.auth.forgotPassword,
        }}
        socialLogin={["google"]}

        footer={{
            description: "Don't have an account? ",
            cta: {
                label: "Sign up",
                href: ROUTES.auth.signup
            }
        }}
    />;
}
