import { type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';
import Heading from '@/components/heading';

// ============= MAIN COMPONENT =============
export default function FAQCTA({ eyebrow, title, subtitle, actions }: IFAQCTA) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <ActionsRow actions={actions} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ActionsRow = ({ actions }: { actions: IFAQCTA['actions'] }) => (
    <div className="flex flex-col @sm:flex-row items-center justify-center gap-4">
        {actions.map((action, i) => (
            <ActionButton key={i} {...action} />
        ))}
    </div>
);

const ActionButton = ({ icon: Icon, label, href, variant = 'default' }: ICTAAction) => (
    <Button variant={variant} size="lg" asChild>
        <a href={href}>
            {Icon && <Icon className="size-4" />}
            {label}
        </a>
    </Button>
);

// ============= TYPES =============
interface ICTAAction {
    icon?: LucideIcon;
    label: string;
    href: string;
    variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

interface IFAQCTA {
    eyebrow: string;
    title: string;
    subtitle: string;
    actions: ICTAAction[];
}
