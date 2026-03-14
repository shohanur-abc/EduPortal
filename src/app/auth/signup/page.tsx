import type { Metadata } from "next";
import Signup from "@/features/auth/sections/signup";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
    title: "Sign Up | EduPortal ",
    description: "Create your EduPortal account",
};

export default function Page() {
    return <Signup
        header={{
            title: "Create an account",
            description: "Join EduPortal today and start your learning journey"
        }}
        name={{
            name: "name",
            label: "Full Name",
            placeholder: "Enter your full name",
        }}
        email={{
            name: "email",
            label: "Email",
            placeholder: "Enter your email address",
        }}
        password={{
            name: "password",
            label: "Password",
            placeholder: "Create a password",
        }}
        confirmPassword={{
            name: "confirmPassword",
            label: "Confirm Password",
            placeholder: "Re-enter your password",
        }}
        roles={{
            name: "role",
            label: "I am a",
            placeholder: "Select your role",
            options: [
                { label: "Student", value: "student" },
                { label: "Teacher", value: "teacher" },
                { label: "Parent", value: "parent" },
                { label: "Principal", value: "principal" },
                { label: "Admin", value: "admin" },
            ],
        }}
        acceptTermsLinks={{
            termsOfService: "#",
            privacyPolicy: "#",
        }}
        socialLogin={["google"]}

        footer={{
            description: "Already have an account? ",
            cta: {
                label: "Sign in",
                href: ROUTES.auth.login
            }
        }}
    />;
}
