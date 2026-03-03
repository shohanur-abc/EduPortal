import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function FeatureGrid({ eyebrow, title, subtitle, features }: IFeatureGrid) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <Grid features={features} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const Grid = ({ features }: { features: IFeatureGridItem[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 @4xl:grid-cols-4 gap-6">
        {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
        ))}
    </div>
);

const FeatureCard = ({ icon: Icon, title, description }: IFeatureGridItem) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all">
        <CardHeader>
            <IconBox icon={Icon} />
            <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
        <Icon className="size-6 text-primary" />
    </div>
);

// ============= TYPES =============
interface IFeatureGridItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface IFeatureGrid {
    eyebrow: string;
    title: string;
    subtitle: string;
    features: IFeatureGridItem[];
}
