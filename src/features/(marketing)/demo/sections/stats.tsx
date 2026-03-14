import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';
import { NumberTicker } from '@/components/ui/number-ticker';

// ============= MAIN COMPONENT =============
export default function DemoStats({ eyebrow, title, subtitle, stats }: IDemoStats) {
    return (
        <Section eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <StatsGrid stats={stats} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const StatsGrid = ({ stats }: { stats: IDemoStats['stats'] }) => (
    <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
        ))}
    </div>
);

const StatCard = ({ value, label, description }: IStat) => (
    <Card className="text-center hover:shadow-md transition-shadow">
        <CardContent className="pt-8 pb-6 space-y-2">
            <div className="text-3xl @sm:text-4xl font-bold text-primary">
                <NumberTicker value={typeof value === 'number' ? value : parseInt(value) || 0} className="text-3xl @sm:text-4xl" />
            </div>
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
    value: string | number;
    label: string;
    description?: string;
}
