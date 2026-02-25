import Link from "next/link";
import { SmartphoneIcon, MailIcon, ShieldCheckIcon } from "lucide-react";
import AuthCard from "../components/auth-card";
import { Button } from "@/components/ui/button";

// ============= MAIN COMPONENT =============
export default function MfaSetup({ header, options, comingSoonMessage, footer }: IMfaSetupSection) {
    return (
        <AuthCard
            title={header.title}
            description={header.description}
            footer={<FooterSkipButton {...footer} />}
        >
            <div className="space-y-4">
                <SecurityIcon />
                <MfaOptions options={options} comingSoonMessage={comingSoonMessage} />
            </div>
        </AuthCard>
    );
}

// ============= CHILD COMPONENTS =============
const SecurityIcon = () => (
    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
        <ShieldCheckIcon className="size-8 text-primary" />
    </div>
);

const MfaOptions = ({ options, comingSoonMessage }: { options: IMfaSetupSection["options"]; comingSoonMessage: string }) => (
    <div className="space-y-3">
        {options.map(({ icon, title, description, disabled }, i) => (
            <MfaOptionCard key={i} icon={ICONS[icon]} title={title} description={description} disabled={disabled} />
        ))}
        <p className="text-center text-sm text-muted-foreground pt-2">{comingSoonMessage}</p>
    </div>
);

const MfaOptionCard = ({ icon, title, description, disabled }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    disabled?: boolean;
}) => (
    <button
        disabled={disabled}
        className="flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
        <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
        </div>
    </button>
);

const FooterSkipButton = ({ href, label }: { href: string; label: string }) => (
    <Button asChild variant="ghost">
        <Link href={href}>{label}</Link>
    </Button>
);

// ============= HELPERS =============
const ICONS: Record<"smartphone" | "mail", React.ReactNode> = {
    smartphone: <SmartphoneIcon className="size-5" />,
    mail: <MailIcon className="size-5" />,
};

// ============= TYPES =============
interface IMfaSetupSection {
    header: { title: string; description: string };
    options: Array<{
        icon: "smartphone" | "mail";
        title: string;
        description: string;
        disabled?: boolean;
    }>;
    comingSoonMessage: string;
    footer: { href: string; label: string };
}
