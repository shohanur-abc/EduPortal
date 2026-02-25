import Link from "next/link";
import { CheckCircle2Icon, MailIcon } from "lucide-react";
import AuthCard from "../components/auth-card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

// ============= MAIN COMPONENT =============
export default function Confirmation({ email, header, notice, actions, footer }: IConfirmationSection) {
    return (
        <AuthCard
            title={header.title}
            description={header.description}
            footer={<FooterNote text={footer} />}
        >
            <div className="space-y-6">
                <SuccessIcon />
                <VerificationNotice email={email} {...notice} />
                <Actions email={email} {...actions} />
            </div>
        </AuthCard>
    );
}

// ============= CHILD COMPONENTS =============
const SuccessIcon = () => (
    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle2Icon className="size-8 text-primary" />
    </div>
);

const VerificationNotice = ({ email, title, description }: { email?: string; title: string; description: string }) => (
    <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
            <MailIcon className="size-4" />
            {title}
        </div>
        <p className="text-sm text-muted-foreground">
            {email ? description.replace("{email}", email) : description}
        </p>
    </div>
);

const Actions = ({ email, verify, signIn }: { email?: string; verify: string; signIn: string }) => (
    <div className="flex flex-col gap-2">
        <Button asChild className="w-full">
            <Link href={email ? `${ROUTES.auth.verifyEmail}?email=${encodeURIComponent(email)}` : ROUTES.auth.verifyEmail}>
                {verify}
            </Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
            <Link href={ROUTES.auth.login}>{signIn}</Link>
        </Button>
    </div>
);

const FooterNote = ({ text }: { text: string }) => (
    <p className="text-sm text-muted-foreground">{text}</p>
);

// ============= TYPES =============
interface IConfirmationSection {
    email?: string;
    header: { title: string; description: string };
    notice: { title: string; description: string };
    actions: { verify: string; signIn: string };
    footer: string;
}
