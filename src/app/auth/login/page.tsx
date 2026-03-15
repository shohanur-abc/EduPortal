import type { Metadata } from "next";
import { LoginPage } from "@/features/auth/sections/login";
import ROUTES from "@/lib/routes";
import { Google } from "@/lib/icon";

export const metadata: Metadata = {
    title: "Sign In | EduPortal ",
    description: "Sign in to your EduPortal account",
};

export default function Page() {
    return <LoginPage
        title="Sign In"
        description="Sign in to your EduPortal account"
        features={[
            {
                icon: <Google />,
                title: "Sign in with Google",
                desc: "Use your Google account for quick and secure access.",
            },
            {
                icon: "🔒",
                title: "Secure Authentication",
                desc: "Your credentials are encrypted and protected with industry-standard security.",
            },
            {
                icon: "⚡",
                title: "Quick Access",
                desc: "Remember your login and access your account in seconds.",
            },
        ]}
        {...loginData}
    />;
}


export const loginData = {
    header: {
        title: "Welcome back",
        description: "Please enter your credentials to access your account"
    },
    email: {
        name: "email",
        label: "Email",
        placeholder: "Enter your email address",
    },
    password: {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
    },
    rememberMe: {
        name: "rememberMe",
        label: "Remember me"
    },
    forgotPassword: {
        label: "Forgot password?",
        href: ROUTES.auth.forgotPassword,
    },
    socialLogin: [
        {
            provider: "google" as const,
            label: "Continue with Google",
            icon: <Google />,
        }
    ],
    footer: {
        description: "Don't have an account? ",
        cta: {
            label: "Sign up",
            href: ROUTES.auth.signup
        }
    }
}