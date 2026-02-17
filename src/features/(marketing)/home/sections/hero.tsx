import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Hero({ announcement, title, description, cta, stats }: IHero) {
    return (
        <Section className="space-y-10">
            <Announcement {...announcement} />
            <Title {...title} />
            <Description text={description} />
            <CTAButtons {...cta} />
            <StatsRow stats={stats} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const Announcement = ({ text, href, badge }: IHero['announcement']) => (
    <div className="flex justify-center">
        <Link href={href} className="group inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-xs @sm:text-sm transition-colors hover:bg-muted">
            <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs">{badge}</Badge>
            <span>{text}</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
    </div>
);

const Title = ({ text, highlight }: IHero['title']) => (
    <h1 className="text-3xl @lg:text-5xl @3xl:text-6xl font-bold tracking-tight text-center leading-tight">
        {text}{' '}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
);

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @sm:text-xl text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
        {text}
    </p>
);

const CTAButtons = ({ primary, secondary }: IHero['cta']) => (
    <div className="flex flex-col @sm:flex-row items-center justify-center gap-4">
        <Button size="lg" className="rounded-full px-8 text-base" asChild>
            <Link href={primary.href}>
                {primary.text}
                <ArrowRight className="ml-2 size-4" />
            </Link>
        </Button>
        <Button size="lg" variant="outline" className="rounded-full px-8 text-base" asChild>
            <Link href={secondary.href}>
                <Play className="mr-2 size-4" />
                {secondary.text}
            </Link>
        </Button>
    </div>
);

const StatsRow = ({ stats }: { stats: IHero['stats'] }) => (
    <div className="grid grid-cols-2 @lg:grid-cols-4 gap-8 pt-8 border-t max-w-3xl mx-auto">
        {stats.map(({ value, label }, i) => (
            <div key={i} className="text-center">
                <div className="text-2xl @sm:text-3xl font-bold text-primary">{value}</div>
                <div className="text-sm text-muted-foreground mt-1">{label}</div>
            </div>
        ))}
    </div>
);

// ============= TYPES =============
interface IHero {
    announcement: {
        text: string;
        href: string;
        badge: string;
    };
    title: {
        text: string;
        highlight?: string;
    };
    description: string;
    cta: {
        primary: { text: string; href: string };
        secondary: { text: string; href: string };
    };
    stats: {
        value: string;
        label: string;
    }[];
}
