import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Culture({ eyebrow, title, subtitle, pillars }: ICulture) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <PillarsGrid pillars={pillars} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const PillarsGrid = ({ pillars }: { pillars: ICulture['pillars'] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @5xl:grid-cols-4 gap-6">
        {pillars.map((pillar, i) => (
            <PillarCard key={i} {...pillar} />
        ))}
    </div>
);

const PillarCard = ({ icon: Icon, title, description }: ICulture['pillars'][number]) => (
    <Card className="group text-center border-0 bg-gradient-to-b from-muted/50 to-transparent hover:from-primary/5 transition-colors">
        <CardContent className="pt-8 pb-8 space-y-4">
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
