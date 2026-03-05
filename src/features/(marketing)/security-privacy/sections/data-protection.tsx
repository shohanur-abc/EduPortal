import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function DataProtection({ eyebrow, title, subtitle, measures }: IDataProtection) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <Grid measures={measures} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const Grid = ({ measures }: { measures: IMeasureItem[] }) => (
    <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-6">
        {measures.map((measure, i) => (
            <MeasureCard key={i} {...measure} />
        ))}
    </div>
);

const MeasureCard = ({ icon: Icon, title, description, features }: IMeasureItem) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all">
        <CardHeader>
            <div className="flex items-center gap-3">
                <IconBox icon={Icon} />
                <CardTitle className="text-lg">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            {features && <FeatureList features={features} />}
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <Icon className="size-6 text-primary" />
    </div>
);

const FeatureList = ({ features }: { features: string[] }) => (
    <ul className="space-y-1.5">
        {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                {feature}
            </li>
        ))}
    </ul>
);

// ============= TYPES =============
interface IMeasureItem {
    icon: LucideIcon;
    title: string;
    description: string;
    features?: string[];
}

interface IDataProtection {
    eyebrow: string;
    title: string;
    subtitle: string;
    measures: IMeasureItem[];
}
