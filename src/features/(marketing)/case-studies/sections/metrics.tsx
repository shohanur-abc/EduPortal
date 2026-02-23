import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Metrics({ eyebrow, title, subtitle, metrics }: IMetrics) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <MetricsGrid metrics={metrics} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const MetricsGrid = ({ metrics }: { metrics: IMetrics['metrics'] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @3xl:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
            <MetricCard key={i} {...metric} />
        ))}
    </div>
);

const MetricCard = ({ icon: Icon, value, label, description }: IMetrics['metrics'][number]) => (
    <Card className="text-center hover:shadow-lg transition-shadow">
        <CardContent className="pt-6 space-y-3">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Icon className="size-6 text-primary" />
            </div>
            <span className="block text-4xl @sm:text-5xl font-bold tracking-tight text-primary">{value}</span>
            <span className="block text-sm font-semibold text-foreground uppercase tracking-wider">{label}</span>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IMetrics {
    eyebrow: string;
    title: string;
    subtitle: string;
    metrics: {
        icon: LucideIcon;
        value: string;
        label: string;
        description: string;
    }[];
}
