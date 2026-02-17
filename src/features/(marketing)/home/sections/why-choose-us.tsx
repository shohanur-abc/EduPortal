import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function WhyChooseUs({ eyebrow, title, subtitle, reasons }: IWhyChooseUs) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <ReasonsGrid reasons={reasons} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ReasonsGrid = ({ reasons }: { reasons: IWhyChooseUs['reasons'] }) => (
    <div className="grid grid-cols-1 @lg:grid-cols-2 @3xl:grid-cols-3 gap-8">
        {reasons.map((reason, i) => (
            <ReasonCard key={i} {...reason} index={i} />
        ))}
    </div>
);

const ReasonCard = ({ icon: Icon, title, description, index }: IWhyChooseUs['reasons'][number] & { index: number }) => (
    <Card className="group border-0 shadow-none bg-transparent">
        <CardContent className="p-0 space-y-4">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="size-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IWhyChooseUs {
    eyebrow: string;
    title: string;
    subtitle: string;
    reasons: {
        icon: LucideIcon;
        title: string;
        description: string;
    }[];
}
