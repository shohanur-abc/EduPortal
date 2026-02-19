import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Values({ eyebrow, title, subtitle, values }: IValues) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <ValuesGrid values={values} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ValuesGrid = ({ values }: { values: IValues['values'] }) => (
    <div className="grid grid-cols-1 @lg:grid-cols-2 @3xl:grid-cols-3 gap-8">
        {values.map((value, i) => (
            <ValueCard key={i} {...value} />
        ))}
    </div>
);

const ValueCard = ({ icon: Icon, title, description }: IValues['values'][number]) => (
    <Card className="text-center group hover:shadow-lg transition-shadow border-0 bg-muted/50">
        <CardContent className="pt-8 pb-8 space-y-4">
            <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                <Icon className="size-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IValues {
    eyebrow: string;
    title: string;
    subtitle: string;
    values: {
        icon: LucideIcon;
        title: string;
        description: string;
    }[];
}
