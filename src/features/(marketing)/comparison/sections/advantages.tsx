import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Advantages({ eyebrow, title, subtitle, advantages }: IAdvantages) {
    return (
        <Section cols={3} eyebrow={eyebrow} title={title} subtitle={subtitle} >
            {advantages.map((advantage, i) => (
                <AdvantageCard key={i} {...advantage} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const AdvantageCard = ({ icon: Icon, title, description }: IAdvantages['advantages'][number]) => (
    <Card className="group h-full transition-all duration-300 hover:shadow-xl hover:border-primary/30 border-border/60 py-0">
        <CardContent className="p-6 @lg:p-8 flex flex-col items-start gap-4">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                <Icon className="size-6 text-primary" />
            </div>
            <div className="space-y-2">
                {/* টেক্সট সাইজও এখন কন্টেইনার অনুযায়ী পরিবর্তন হবে */}
                <h3 className="text-xl @3xl:text-2xl font-bold text-foreground leading-tight">
                    {title}
                </h3>
                <p className="text-sm @3xl:text-base text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>
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