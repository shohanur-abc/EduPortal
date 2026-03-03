import { Award, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function CaseStudiesHero({ eyebrow, title, description, stats }: ICaseStudiesHero) {
    return (
        <Section className="space-y-10">
            <EyebrowBadge text={eyebrow} />
            <Title text={title} />
            <Description text={description} />
            <StatsRow stats={stats} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const EyebrowBadge = ({ text }: { text: string }) => (
    <div className="flex justify-center">
        <Badge variant="ghost" className="text-sm tracking-widest text-primary border-input gap-1.5">
            <Award className="size-3.5" />
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

const StatsRow = ({ stats }: { stats: ICaseStudiesHero['stats'] }) => (
    <div className="grid grid-cols-2 @lg:grid-cols-4 gap-6 @lg:gap-8 max-w-4xl mx-auto">
        {stats.map((stat, i) => (
            <StatItem key={i} {...stat} />
        ))}
    </div>
);

const StatItem = ({ icon: Icon, value, label }: ICaseStudiesHero['stats'][number]) => (
    <div className="flex flex-col items-center gap-2 text-center">
        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="size-5 text-primary" />
        </div>
        <span className="text-3xl @sm:text-4xl font-bold tracking-tight text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
    </div>
);

// ============= TYPES =============
interface ICaseStudiesHero {
    eyebrow: string;
    title: string;
    description: string;
    stats: {
        icon: LucideIcon;
        value: string;
        label: string;
    }[];
}
