import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Hero({ badge, title, highlight, description, cta }: IHero) {
    return (
        <Section className="space-y-8 text-center">
            <BadgeLabel text={badge} />
            <Title text={title} highlight={highlight} />
            <Description text={description} />
            {cta && <CTAButtons {...cta} />}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const BadgeLabel = ({ text }: { text: string }) => (
    <div className="flex justify-center">
        <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm font-medium">
            {text}
        </Badge>
    </div>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl @3xl:text-7xl font-bold tracking-tight leading-tight max-w-4xl mx-auto">
        {text}{' '}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
);

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        {text}
    </p>
);

const CTAButtons = ({ primary, secondary }: IHeroCTA) => (
    <div className="flex flex-col @sm:flex-row items-center justify-center gap-4 pt-2">
        <Button size="lg" className="rounded-full px-8 text-base" asChild>
            <Link href={primary.href}>
                {primary.text}
                <ArrowRight className="ml-2 size-4" />
            </Link>
        </Button>
        {secondary && (
            <Button size="lg" variant="outline" className="rounded-full px-8 text-base" asChild>
                <Link href={secondary.href}>{secondary.text}</Link>
            </Button>
        )}
    </div>
);

// ============= TYPES =============
interface IHeroCTA {
    primary: { text: string; href: string };
    secondary?: { text: string; href: string };
}

interface IHero {
    badge: string;
    title: string;
    highlight?: string;
    description: string;
    cta?: IHeroCTA;
}
