import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Features({ eyebrow, title, subtitle, features }: IFeatures) {
    return (
        <Section cols={3} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {features.map((feature, i) => (
                <FeatureCard key={i} {...feature} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const FeatureCard = ({ icon: Icon, title, description }: IFeatures['features'][number]) => (
    <Card className="group hover:border-primary/50 transition-colors">
        <CardHeader>
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                <Icon className="size-6 text-primary" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IFeatures {
    eyebrow: string;
    title: string;
    subtitle: string;
    features: {
        icon: LucideIcon;
        title: string;
        description: string;
    }[];
}
