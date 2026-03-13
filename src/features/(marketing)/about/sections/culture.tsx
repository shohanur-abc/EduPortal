import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Culture({ eyebrow, title, subtitle, pillars }: ICulture) {
    return (
        <Section cols={4} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {pillars.map((pillar, i) => (
                <PillarCard key={i} {...pillar} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const PillarCard = ({ icon: Icon, title, description }: ICulture['pillars'][number]) => (
    <Card className="group text-center border-0 bg-linear-to-b from-muted/50 to-transparent hover:from-primary/5 transition-colors">
        <CardContent className="space-y-4 mt-2">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Icon className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface ICulture {
    eyebrow: string;
    title: string;
    subtitle: string;
    pillars: {
        icon: LucideIcon;
        title: string;
        description: string;
    }[];
}
