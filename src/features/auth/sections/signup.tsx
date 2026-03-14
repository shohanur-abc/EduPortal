"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormInput, Email, Password } from "@/components/molecules/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ROUTES } from "@/lib/routes";
import { signupSchema, type SignupInput } from "@/schemas/auth";
import { signup } from "../actions";
import { Checkbox } from "@/components/molecules/checkbox";
import { FormCard } from "../components/form";
import { Select } from "@/components/molecules";

// ============= MAIN COMPONENT =============
export default function Signup({ header, footer, name, email, password, confirmPassword, roles, acceptTermsLinks: atl, socialLogin }: SignupProps) {
    const router = useRouter();
    const form = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "student",
            acceptTerms: false as unknown as true,
        },
    });

    const onSubmit = async (data: SignupInput) => {
        const result = await signup(data);
        if (result.success) {
            toast.success(result.message);
            router.push(
                `${ROUTES.auth.confirmation}?email=${encodeURIComponent(data.email)}`
            );
        } else {
            toast.error(result.message);
        }
    };

    return (
        <FormCard header={header} footer={footer} socialLogin={socialLogin} form={form} onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput {...name} />
            <Email {...email} />
            <Password {...password} />
            <Password {...confirmPassword} />
            <Select {...roles} />
            <Checkbox name="acceptTerms" label={<div className="[&>a]:text-blue-400 [&>a]:hover:underline">
                I agree to the
                <Link href={atl?.termsOfService} > Terms of Service </Link> and
                <Link href={atl?.privacyPolicy} > Privacy Policy</Link>
            </div>}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting} >
                {form.formState.isSubmitting && (<Spinner className="mr-2" />)}
                Create account
            </Button>
        </FormCard>
    );
}







// ============= TYPES =============
interface SignupProps {
    header: {
        title: string;
        description: string;
    }
    footer: {
        description: string;
        cta: {
            href: string;
            label: string;
        }
    }

    name: React.ComponentProps<typeof FormInput>;
    email: React.ComponentProps<typeof Email>;
    password: React.ComponentProps<typeof Password>;
    confirmPassword: React.ComponentProps<typeof Password>;
    roles: React.ComponentProps<typeof Select>;
    socialLogin?: ('google' | 'facebook' | 'x')[];
    acceptTermsLinks: {
        termsOfService: string;
        privacyPolicy: string;
    };
}