import type { Metadata } from "next";
import VerifyEmail from "@/features/auth/sections/verify-email";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Verify Email | EduPortal ",
  description: "Verify your email address",
};

export default function Page() {
  return (
    <VerifyEmail
      header={{
        title: "Verify your email",
        description: "Enter the 6-digit code sent to your email",
      }}
      submitLabel="Verify email"
      footer={{
        href: ROUTES.auth.login,
        label: "← Back to sign in",
      }}
      resend={{
        prompt: "Didn't receive a code?",
        label: "Resend",
      }}
    />
  );
}
