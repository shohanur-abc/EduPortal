import { type LucideIcon } from '@/lib/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';
import { NumberTicker } from '@/components/ui/number-ticker';

// ============= MAIN COMPONENT =============
export default function Metrics({ eyebrow, title, subtitle, metrics }: IMetrics) {
    return (
        <Section cols={4} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {metrics.map((metric, i) => (
                <MetricCard key={i} {...metric} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const MetricCard = ({ icon: Icon, value, label, description }: IMetrics['metrics'][number]) => (
    <Card className="text-center hover:shadow-lg transition-shadow">
        <CardContent className="space-y-3">
            <div className="size-12 mb-4 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Icon className="size-6 text-primary" />
            </div>
            <span className="block text-4xl @sm:text-5xl font-bold tracking-tight text-primary">
                <NumberTicker value={typeof value === 'number' ? value : parseInt(value) || 0} className="text-4xl @sm:text-5xl" />
            </span>
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
        value: string | number;
        label: string;
        description: string;
    }[];
}
