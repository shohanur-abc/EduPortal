import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Advantages({ eyebrow, title, subtitle, advantages }: IAdvantages) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <AdvantagesGrid advantages={advantages} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const AdvantagesGrid = ({ advantages }: { advantages: IAdvantages['advantages'] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @3xl:grid-cols-3 gap-6">
        {advantages.map((advantage, i) => (
            <AdvantageCard key={i} {...advantage} />
        ))}
    </div>
);

const AdvantageCard = ({ icon: Icon, title, description }: IAdvantages['advantages'][number]) => (
    <Card className="group hover:shadow-lg transition-shadow hover:border-primary/20">
        <CardContent className="pt-6 space-y-4">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <Icon className="size-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IAdvantages {
    eyebrow: string;
    title: string;
    subtitle: string;
    advantages: {
        icon: LucideIcon;
        title: string;
        description: string;
    }[];
}
