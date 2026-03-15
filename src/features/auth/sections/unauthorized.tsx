import Link from "next/link";
import { ShieldXIcon } from "@/lib/icon";
import AuthCard, { FooterLink } from "../components/auth-card";
import { Button } from "@/components/ui/button";

// ============= MAIN COMPONENT =============
export default function Unauthorized({ header, message, actions, footer }: IUnauthorizedSection) {
    return (
        <AuthCard
            title={header.title}
            description={header.description}
            footer={<FooterLink {...footer} />}
        >
            <div className="space-y-6">
                <DeniedIcon />
                <Message text={message} />
                <Actions actions={actions} />
            </div>
        </AuthCard>
    );
}

// ============= CHILD COMPONENTS =============
const DeniedIcon = () => (
    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <ShieldXIcon className="size-8 text-destructive" />
    </div>
);

const Message = ({ text }: { text: string }) => (
    <div className="text-center">
        <p className="text-sm text-muted-foreground">{text}</p>
    </div>
);

const Actions = ({ actions }: { actions: IUnauthorizedSection["actions"] }) => (
    <div className="flex flex-col gap-2">
        {actions.map(({ href, label, variant }, i) => (
            <Button key={i} asChild variant={variant ?? "default"} className="w-full">
                <Link href={href}>{label}</Link>
            </Button>
        ))}
    </div>
);

// ============= TYPES =============
interface IUnauthorizedSection {
    header: { title: string; description: string };
    message: string;
    actions: Array<{ href: string; label: string; variant?: "default" | "outline" | "ghost" }>;
    footer: { href: string; label: string };
}
