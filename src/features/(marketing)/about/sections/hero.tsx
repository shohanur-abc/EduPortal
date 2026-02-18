import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function AboutHero({ badge, title, description, cta }: IAboutHero) {
    return (
        <Section className="space-y-8">
            <BadgeLabel text={badge} />
            <Title {...title} />
            <Description text={description} />
            <CTAButton {...cta} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const BadgeLabel = ({ text }: { text: string }) => (
    <div className="flex justify-center">
        <Badge variant="secondary" className="rounded-full px-4 py-1">{text}</Badge>
    </div>
);

const Title = ({ text, highlight }: IAboutHero['title']) => (
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

const CTAButton = ({ text, href }: IAboutHero['cta']) => (
    <div className="flex justify-center">
        <Button size="lg" className="rounded-full px-8" asChild>
            <Link href={href}>
                {text}
                <ArrowRight className="ml-2 size-4" />
            </Link>
        </Button>
    </div>
);

// ============= TYPES =============
interface IAboutHero {
    badge: string;
    title: {
        text: string;
        highlight?: string;
    };
    description: string;
    cta: { text: string; href: string };
}
