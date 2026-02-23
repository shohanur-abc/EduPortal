import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function SupportOptions({ eyebrow, title, subtitle, options }: ISupportOptions) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <OptionsGrid options={options} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const OptionsGrid = ({ options }: { options: ISupportOption[] }) => (
    <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-4 gap-6">
        {options.map((option, i) => (
            <OptionCard key={i} {...option} />
        ))}
    </div>
);

const OptionCard = ({ icon: Icon, name, description, availability, badge, ctaLabel }: ISupportOption) => (
    <Card className="text-center">
        <CardHeader className="items-center space-y-3">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="size-7 text-primary" />
            </div>
            <div className="flex items-center gap-2 justify-center">
                <CardTitle>{name}</CardTitle>
                {badge && <Badge variant="secondary">{badge}</Badge>}
            </div>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">{availability}</p>
            {ctaLabel && (
                <Button variant="outline" size="sm">
                    {ctaLabel}
                </Button>
            )}
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface ISupportOptions {
    eyebrow: string;
    title: string;
    subtitle: string;
    options: ISupportOption[];
}

interface ISupportOption {
    icon: LucideIcon;
    name: string;
    description: string;
    availability: string;
    badge?: string;
    ctaLabel?: string;
}
