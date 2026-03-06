import LoginDialog from "@/features/auth/sections/login-dialog";
import ROUTES from "@/lib/routes";

export default function Page() {
    return (
        <LoginDialog
            header={{
                title: "Log in or sign up",
                description: "You'll get smarter responses and can upload files, images, and more.",
            }}
            email={{
                name: "email",
                label: "Email",
                placeholder: "Email address",
            }}
            password={{
                name: "password",
                label: "Password",
                placeholder: "Enter your password",
            }}
            rememberMe={{
                name: "rememberMe",
                label: "Remember me",
            }}
            forgotPassword={{
                label: "Forgot password?",
                href: ROUTES.auth.forgotPassword,
            }}
            socialLogin={["google"]}
            footer={{
                description: "Don't have an account?",
                cta: {
                    label: "Sign up",
                    href: ROUTES.auth.signup,
                },
            }}
        />
    );
}
