import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Stats({ eyebrow, title, subtitle, stats }: IStats) {
    return (
        <Section cols={4} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {stats.map((stat, i) => (
                <StatCard key={i} {...stat} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const StatCard = ({ value, label, description }: IStats['stats'][number]) => (
    <Card className="text-center hover:shadow-md transition-shadow py-0">
        <CardContent className="pt-8 pb-6 space-y-2">
            <div className="text-3xl @sm:text-4xl font-bold text-primary">{value}</div>
            <div className="font-semibold text-sm">{label}</div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IStats {
    eyebrow: string;
    title: string;
    subtitle: string;
    stats: {
        value: string;
        label: string;
        description?: string;
    }[];
}
