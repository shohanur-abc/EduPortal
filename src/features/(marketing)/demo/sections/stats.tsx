import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function DemoStats({ eyebrow, title, subtitle, stats }: IDemoStats) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <StatsGrid stats={stats} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const StatsGrid = ({ stats }: { stats: IDemoStats['stats'] }) => (
    <div className="grid grid-cols-2 @lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
        ))}
    </div>
);

const StatCard = ({ value, label, description }: IStat) => (
    <Card className="text-center hover:shadow-md transition-shadow">
        <CardContent className="pt-8 pb-6 space-y-2">
            <div className="text-3xl @sm:text-4xl font-bold text-primary">{value}</div>
            <div className="font-semibold text-sm text-foreground">{label}</div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IDemoStats {
    eyebrow: string;
    title: string;
    subtitle: string;
    stats: IStat[];
}

interface IStat {
    value: string;
    label: string;
    description?: string;
}
