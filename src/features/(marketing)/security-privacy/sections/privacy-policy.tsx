import { type LucideIcon } from '@/lib/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion } from '@/components/molecules';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function PrivacyPolicy({ eyebrow, title, subtitle, highlights, details }: IPrivacyPolicy) {
    return (
        <Section cols={2} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <div className="space-y-4">
                {highlights.map((item, i) => (
                    <HighlightCard key={i} {...item} />
                ))}
            </div>

            <div className="flex items-start">
                <Accordion
                    items={details.map((detail, i) => ({
                        value: `policy-${i}`,
                        title: detail.title,
                        content: detail.content,
                    }))}
                    className="w-full"
                    classNames={{ trigger: "text-left text-base font-medium", contentInner: "text-muted-foreground leading-relaxed" }}
                />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const HighlightCard = ({ icon: Icon, title, description }: IPrivacyPolicy['highlights'][0]) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all">
        <CardHeader>
            <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-5 text-primary" />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IPrivacyPolicy {
    eyebrow: string;
    title: string;
    subtitle: string;
    highlights: {
        icon: LucideIcon;
        title: string;
        description: string;
    }[];
    details: {
        title: string;
        content: string;
    }[];
}
