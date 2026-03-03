import { ArrowRight, GitCompareArrows, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function ComparisonHero({ eyebrow, title, description, highlights, cta }: IComparisonHero) {
    return (
        <Section className="space-y-10">
            <EyebrowBadge text={eyebrow} />
            <Title text={title} />
            <Description text={description} />
            <HighlightsRow highlights={highlights} />
            <Actions cta={cta} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const EyebrowBadge = ({ text }: { text: string }) => (
    <div className="flex justify-center">
        <Badge variant="ghost" className="text-sm tracking-widest text-primary border-input gap-1.5">
            <GitCompareArrows className="size-3.5" />
            {text}
        </Badge>
    </div>
);

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl @3xl:text-7xl font-bold tracking-tight text-center leading-tight">
        {text}
    </h1>
);

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @sm:text-xl text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
        {text}
    </p>
);

const HighlightsRow = ({ highlights }: { highlights: IComparisonHero['highlights'] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @3xl:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {highlights.map((item, i) => (
            <HighlightItem key={i} {...item} />
        ))}
    </div>
);

const HighlightItem = ({ icon: Icon, label, value }: IComparisonHero['highlights'][number]) => (
    <div className="flex flex-col items-center gap-2 text-center">
        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="size-5 text-primary" />
        </div>
        <span className="text-2xl @sm:text-3xl font-bold tracking-tight text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
    </div>
);

const Actions = ({ cta }: { cta: IComparisonHero['cta'] }) => (
    <div className="flex flex-col @sm:flex-row items-center justify-center gap-4">
        <Button size="lg" className="rounded-full px-8" asChild>
            <Link href={cta.primary.href}>
                {cta.primary.text}
                <ArrowRight className="ml-2 size-4" />
            </Link>
        </Button>
        <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
            <Link href={cta.secondary.href}>{cta.secondary.text}</Link>
        </Button>
    </div>
);

// ============= TYPES =============
interface IComparisonHero {
    eyebrow: string;
    title: string;
    description: string;
    highlights: {
        icon: LucideIcon;
        value: string;
        label: string;
    }[];
    cta: {
        primary: { text: string; href: string };
        secondary: { text: string; href: string };
    };
}
