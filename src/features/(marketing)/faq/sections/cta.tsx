import { type LucideIcon } from '@/lib/icon';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';
import Link from 'next/link';

// ============= MAIN COMPONENT =============
export default function FAQCTA({ eyebrow, title, subtitle, actions }: IFAQCTA) {
    return (
        <Section eyebrow={eyebrow} title={title} subtitle={subtitle} className='flex flex-col @sm:flex-row items-center justify-center gap-4'>
            {actions.map((action, i) => (
                <ActionButton key={i} {...action} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ActionButton = ({ icon: Icon, label, href, variant = 'default' }: IFAQCTA['actions'][0]) => (
    <Button variant={variant} size="lg" asChild>
        <Link href={href}>
            {Icon && <Icon className="size-4" />}
            {label}
        </Link>
    </Button>
);

// ============= TYPES =============
interface IFAQCTA {
    eyebrow: string;
    title: string;
    subtitle: string;
    actions: {
        icon?: LucideIcon;
        label: string;
        href: string;
        variant?: 'default' | 'outline' | 'secondary' | 'ghost';
    }[];
}
