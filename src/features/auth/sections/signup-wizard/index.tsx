"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Camera, Cake, Sparkles, BookOpen, Shield, Users, ChevronLeft, ChevronRight, } from "lucide-react";
import { Form } from "@/components/molecules/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, } from "@/components/ui/avatar";
import { ROUTES } from "@/lib/routes";
import { signup } from "@/services/auth";
import { cn } from "@/lib/utils";
import { ProfilePanel } from "./profile";
import { WelcomePanel } from "./welcome";
import { AccountPanel } from "./account";
import { SignupInput, signupSchema } from "@/schemas/auth/signup";

// ============= MAIN COMPONENT =============
export default function SignupWizard({ config }: ISignupWizard) {
    const [step, setStep] = useState(0);
    const router = useRouter();

    const form = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            role: "student",
            acceptTerms: false as unknown as true,
            firstName: "",
            lastName: "",
            username: "",
            dateOfBirth: "",
            gender: "male",
            avatar: "",
        },
        mode: "onTouched",
    });

    const totalSteps = STEP_KEYS.length;

    const goNext = async () => {
        if (step === 0) { setStep(1); return; }
        if (step === 1) {
            const ok = await form.trigger(ACCOUNT_FIELDS);
            if (ok) setStep(2);
            return;
        }
        if (step === 2) {
            console.log(form.formState.errors);
            const ok = await form.trigger(PROFILE_FIELDS);
            if (!ok) return;
            await handleSubmit();
        }
    };

    const goBack = () => setStep((s) => Math.max(0, s - 1));

    const handleSubmit = async () => {
        const values = form.getValues();
        console.log(values);
        const result = await signup({
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            role: values.role,
            acceptTerms: values.acceptTerms,
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            gender: values.gender,
            dateOfBirth: values.dateOfBirth,
            avatar: values.avatar,
        });
        if (result.success) {
            toast.success(result.message);
            router.push(`${ROUTES.auth.confirmation}?email=${encodeURIComponent(values.email)}`);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <WizardLayout
            infoPanel={<InfoPanel step={step} />}
            formPanel={
                <Form form={form} onSubmit={(e) => e.preventDefault()} className="contents">{[
                    <WelcomePanel key="welcome" config={config.welcome} onStart={goNext} />,
                    <AccountPanel key="account" config={config.account} />,
                    <ProfilePanel key="profile" config={config.profile} />,
                ][step]
                }</Form>
            }
            progress={<StepProgress current={step} total={totalSteps} />}
            footer={
                step > 0 && (
                    <WizardNav
                        step={step}
                        total={totalSteps}
                        isSubmitting={form.formState.isSubmitting}
                        onBack={goBack}
                        onNext={goNext}
                    />
                )
            }
        />
    );
}

// ============= CHILD COMPONENTS =============

const WizardLayout = ({ infoPanel, formPanel, progress, footer }: WizardLayoutProps) => (
    <div className="h-screen grid grid-rows-[1fr_auto] bg-background">
        <div className="grid lg:grid-cols-2">
            <div className="relative hidden lg:flex flex-col bg-muted/20 border-r p-10 gap-8">
                {infoPanel}
            </div>
            <div className="flex flex-col items-center justify-center p-8 lg:p-12">
                {formPanel}
            </div>
        </div>
        {footer}
        {progress}
    </div>
);

const InfoPanel = ({ step }: { step: number }) => {
    const data = INFO_STEPS[step];
    return (
        <div className="flex flex-col gap-10 justify-center flex-1">
            <div className="space-y-4">
                <p className="text-sm font-medium text-primary uppercase tracking-widest">{data.eyebrow}</p>
                <h1 className="text-4xl font-bold leading-tight tracking-tight">{data.title}</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">{data.description}</p>
            </div>
            {data.features && (
                <ul className="space-y-4">
                    {data.features.map(({ icon: Icon, title, desc }, i) => (
                        <li key={i} className="flex gap-4 items-start border rounded-xl p-4 bg-muted/30">
                            <span className="mt-0.5 size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <Icon className="size-4" />
                            </span>
                            <div>
                                <p className="font-medium text-sm">{title}</p>
                                <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {data.socialProof && (
                <div className="flex items-center gap-3">
                    <SocialProofAvatars initials={data.socialProof.initials} />
                    <p className="text-sm text-muted-foreground">{data.socialProof.text}</p>
                </div>
            )}
        </div>
    );
};

const SocialProofAvatars = ({ initials }: { initials: string[] }) => (
    <div className="flex -space-x-2">
        {initials.map((init, i) => (
            <Avatar key={i} className="size-8 border-2 border-background ring-1 ring-border">
                <AvatarFallback className={cn("text-xs font-semibold", AVATAR_COLORS[i % AVATAR_COLORS.length])}>
                    {init}
                </AvatarFallback>
            </Avatar>
        ))}
    </div>
);



const StepProgress = ({ current, total }: { current: number; total: number }) => (
    <div className="flex gap-1.5 px-8 pb-4">
        {Array.from({ length: total }).map((_, i) => (
            <div
                key={i}
                className={cn(
                    "h-1 flex-1 rounded-full transition-all duration-500",
                    i < current ? "bg-emerald-500" : i === current ? "bg-primary" : "bg-muted"
                )}
            />
        ))}
    </div>
);

const WizardNav = ({ step, total, isSubmitting, onBack, onNext }: WizardNavProps) => (
    <div className="flex items-center justify-between px-8 py-4 border-t">
        <Button variant="ghost" onClick={onBack} className="gap-1.5">
            <ChevronLeft className="size-4" /> Previous
        </Button>
        <span className="text-xs text-muted-foreground">
            Step {step + 1} of {total}
        </span>
        <Button onClick={onNext} disabled={isSubmitting} className="gap-1.5">
            {isSubmitting && <Spinner className="size-4" />}
            {step === total - 1 ? "Create Account" : "Next"}
            {step < total - 1 && <ChevronRight className="size-4" />}
        </Button>
    </div>
);

// ============= HELPERS =============
const STEP_KEYS = ["welcome", "account", "profile"] as const;

const ACCOUNT_FIELDS: (keyof SignupInput)[] = ["email", "password", "confirmPassword", "role", "acceptTerms"];
const PROFILE_FIELDS: (keyof SignupInput)[] = ["firstName", "lastName", "username", "gender"];

const AVATAR_COLORS = [
    "bg-violet-500 text-white",
    "bg-sky-500 text-white",
    "bg-emerald-500 text-white",
    "bg-amber-500 text-white",
    "bg-rose-500 text-white",
];

const GENDER_OPTIONS = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
];

const INFO_STEPS = [
    {
        eyebrow: "Welcome",
        title: "Your learning journey starts here",
        description: "Join thousands of students, teachers, and parents on a platform built for modern education.",
        socialProof: {
            initials: ["JC", "TK", "MR", "AS"],
            text: "Join 5K+ professionals already using our platform",
        },
    },
    {
        eyebrow: "Step 1 — Account",
        title: "Create your account",
        description: "Set up your credentials and choose your role. Everything is encrypted and secure.",
        features: [
            { icon: Shield, title: "End-to-end security", desc: "Your data is encrypted and never shared with third parties." },
            { icon: Users, title: "Role-based access", desc: "Custom dashboards for students, teachers, parents and admins." },
            { icon: BookOpen, title: "Everything in one place", desc: "Attendance, results, fees and notices — all centralised." },
        ],
    },
    {
        eyebrow: "Step 2 — Profile",
        title: "Personalise your profile",
        description: "Add a few details so your teachers and classmates can recognise you.",
        features: [
            { icon: Camera, title: "Add your best photo", desc: "Help others recognise and connect with you instantly." },
            { icon: Sparkles, title: "Pick your username", desc: "Your digital identity — how people will find you." },
            { icon: Cake, title: "Share your birthday", desc: "So we can wish you on your special day!" },
        ],
    },
];

// ============= TYPES =============
interface WizardLayoutProps {
    infoPanel: React.ReactNode;
    formPanel: React.ReactNode;
    progress: React.ReactNode;
    footer: React.ReactNode;
}

interface WizardNavProps {
    step: number;
    total: number;
    isSubmitting: boolean;
    onBack: () => void;
    onNext: () => void;
}

export interface ISignupWizard {
    config: {
        welcome: {
            title: string;
            description: string;
        };
        account: {
            title: string;
            description: string;
            termsHref: string;
            privacyHref: string;
        };
        profile: {
            title: string;
            description: string;
        };
    };
}
