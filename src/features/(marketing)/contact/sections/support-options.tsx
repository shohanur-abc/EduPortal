import type { LucideIcon } from '@/lib/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button, Badge } from "@/components/molecules";
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function SupportOptions({ eyebrow, title, subtitle, options }: ISupportOptions) {
    return (
        <Section cols={4} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {options.map((option, i) => (
                <OptionCard key={i} {...option} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const OptionCard = ({ icon: Icon, name, description, availability, badge, ctaLabel }: ISupportOptions['options'][0]) => (
    <Card className="text-center">
        <CardHeader className="items-center space-y-3">
            <div className="mx-auto size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
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
    options: {
        icon: LucideIcon;
        name: string;
        description: string;
        availability: string;
        badge?: string;
        ctaLabel?: string;
    }[];
}

