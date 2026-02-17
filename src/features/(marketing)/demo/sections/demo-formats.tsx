import { type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function DemoFormats({ eyebrow, title, subtitle, formats }: IDemoFormats) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <FormatsGrid formats={formats} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const FormatsGrid = ({ formats }: { formats: IDemoFormats['formats'] }) => (
    <div className="grid grid-cols-1 @lg:grid-cols-3 gap-6">
        {formats.map((format, i) => (
            <FormatCard key={i} {...format} />
        ))}
    </div>
);

const FormatCard = ({ icon: Icon, name, description, badge, duration, features, highlighted }: IDemoFormat) => (
    <Card className={highlighted ? 'border-primary shadow-lg ring-1 ring-primary/20 relative' : 'relative'}>
        {badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="default">{badge}</Badge>
            </div>
        )}
        <CardHeader className="text-center space-y-3 pt-8">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Icon className="size-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">{name}</h3>
            {duration && (
                <span className="text-sm text-muted-foreground">{duration}</span>
            )}
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">{description}</p>
            {features && (
                <FeaturesList features={features} />
            )}
        </CardContent>
    </Card>
);

const FeaturesList = ({ features }: { features: string[] }) => (
    <ul className="space-y-2">
        {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary shrink-0" />
                {feature}
            </li>
        ))}
    </ul>
);

// ============= TYPES =============
interface IDemoFormats {
    eyebrow: string;
    title: string;
    subtitle: string;
    formats: IDemoFormat[];
}

interface IDemoFormat {
    icon: LucideIcon;
    name: string;
    description: string;
    badge?: string;
    duration?: string;
    features?: string[];
    highlighted?: boolean;
}
