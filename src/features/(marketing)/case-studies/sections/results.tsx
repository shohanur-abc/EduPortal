import { ArrowRight, type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Results({ eyebrow, title, subtitle, comparisons }: IResults) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <ComparisonsGrid comparisons={comparisons} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ComparisonsGrid = ({ comparisons }: { comparisons: IResults['comparisons'] }) => (
    <div className="grid grid-cols-1 @lg:grid-cols-2 gap-6">
        {comparisons.map((comparison, i) => (
            <ComparisonCard key={i} {...comparison} />
        ))}
    </div>
);

const ComparisonCard = ({ icon: Icon, label, before, after }: IResults['comparisons'][number]) => (
    <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="size-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{label}</h3>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <BeforeBlock {...before} />
                <ArrowRight className="size-5 text-muted-foreground shrink-0" />
                <AfterBlock {...after} />
            </div>
        </CardContent>
    </Card>
);

const BeforeBlock = ({ value, description }: IResults['comparisons'][number]['before']) => (
    <div className="rounded-xl bg-destructive/10 p-4 text-center space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-destructive">Before</span>
        <span className="block text-2xl font-bold text-destructive">{value}</span>
        <span className="block text-xs text-muted-foreground">{description}</span>
    </div>
);

const AfterBlock = ({ value, description }: IResults['comparisons'][number]['after']) => (
    <div className="rounded-xl bg-emerald-500/10 p-4 text-center space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">After</span>
        <span className="block text-2xl font-bold text-emerald-600">{value}</span>
        <span className="block text-xs text-muted-foreground">{description}</span>
    </div>
);

// ============= TYPES =============
interface IResults {
    eyebrow: string;
    title: string;
    subtitle: string;
    comparisons: {
        icon: LucideIcon;
        label: string;
        before: { value: string; description: string };
        after: { value: string; description: string };
    }[];
}
