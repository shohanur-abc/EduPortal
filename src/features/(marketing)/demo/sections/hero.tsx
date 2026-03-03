import { ShieldCheck, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function DemoHero({ eyebrow, title, highlight, description, trustBadges }: IDemoHero) {
    return (
        <Section className="space-y-8">
            <EyebrowBadge text={eyebrow} />
            <Title text={title} highlight={highlight} />
            <Description text={description} />
            <TrustBadges badges={trustBadges} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const EyebrowBadge = ({ text }: { text: string }) => (
    <div className="flex justify-center">
        <Badge variant="secondary" className="rounded-full px-4 py-1">{text}</Badge>
    </div>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center leading-tight">
        {text}{' '}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
);

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @sm:text-xl text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
        {text}
    </p>
);

const TrustBadges = ({ badges }: { badges: ITrustBadge[] }) => (
    <div className="flex flex-wrap items-center justify-center gap-4 @md:gap-6">
        {badges.map((badge, i) => (
            <TrustBadgeItem key={i} {...badge} />
        ))}
    </div>
);

const TrustBadgeItem = ({ icon: Icon = ShieldCheck, label }: ITrustBadge) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4 text-primary shrink-0" />
        <span>{label}</span>
    </div>
);

// ============= TYPES =============
interface IDemoHero {
    eyebrow: string;
    title: string;
    highlight?: string;
    description: string;
    trustBadges: ITrustBadge[];
}

interface ITrustBadge {
    icon?: LucideIcon;
    label: string;
}
