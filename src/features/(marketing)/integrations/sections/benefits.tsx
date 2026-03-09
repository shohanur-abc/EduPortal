import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Benefits({ eyebrow, title, subtitle, benefits }: IBenefits) {
    return (
        <Section eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <Grid benefits={benefits} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const Grid = ({ benefits }: { benefits: IBenefitItem[] }) => (
    <div className="grid grid-cols-1 @xl:grid-cols-2 @5xl:grid-cols-3 gap-6">
        {benefits.map((benefit, i) => (
            <BenefitCard key={i} {...benefit} />
        ))}
    </div>
);

const BenefitCard = ({ icon: Icon, title, description }: IBenefitItem) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all text-center">
        <CardHeader className="items-center justify-center">
            <IconBox icon={Icon} />
            <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-14  mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
        <Icon className="size-7 text-primary" />
    </div>
);

// ============= TYPES =============
interface IBenefitItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface IBenefits {
    eyebrow: string;
    title: string;
    subtitle: string;
    benefits: IBenefitItem[];
}
