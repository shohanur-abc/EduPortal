import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function WhyChooseUs({ eyebrow, title, subtitle, reasons }: IWhyChooseUs) {
    return (
        <Section cols={3} className='gap-8' eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {reasons.map((reason, i) => (
                <ReasonCard key={i} {...reason} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ReasonCard = ({ icon: Icon, title, description }: IWhyChooseUs['reasons'][number]) => (
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
