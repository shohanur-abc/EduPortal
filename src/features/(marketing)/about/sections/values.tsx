import { LucideIcon } from '@/lib/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Values({ eyebrow, title, subtitle, values }: IValues) {
    return (
        <Section cols={3} eyebrow={eyebrow} title={title} subtitle={subtitle} >
            {values.map(({ icon: Icon, title, description }, i) => (
                <Card key={i} className="text-center group hover:shadow-lg transition-shadow border-0 bg-muted/50 py-0">
                    <CardContent className="pt-8 pb-8 space-y-4">
                        <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                            <Icon className="size-7 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    </CardContent>
                </Card>
            ))}
        </Section>
    );
}


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
