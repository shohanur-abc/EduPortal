import { type LucideIcon } from '@/lib/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Section } from '@/components/section';
import { ShineBorder } from '@/components/ui/shine-border';

// ============= MAIN COMPONENT =============
export default function FeatureGrid({ eyebrow, title, subtitle, features }: IFeatureGrid) {
    return (
        <Section cols={4} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {features.map((feature, i) => (
                <FeatureCard key={i} {...feature} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const FeatureCard = ({ icon: Icon, title, description }: IFeatureGridItem) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all gap-4 ">
        <ShineBorder shineColor={['var(--primary)', 'var(--chart-2)']} className='blur-3xl' />
        <CardHeader>
            <IconBox icon={Icon} />
            <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className='gap-'>
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
