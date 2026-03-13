import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
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
                <Accordion type="single" collapsible className="w-full">
                    {details.map((detail, i) => (
                        <PolicyItem key={i} index={i} {...detail} />
                    ))}
                </Accordion>
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const HighlightCard = ({ icon: Icon, title, description }: IPrivacyPolicy['highlights'][0]) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all">
        <CardHeader>
            <div className="flex items-center gap-3">
                <IconBox icon={Icon} />
                <CardTitle className="text-base">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <Icon className="size-5 text-primary" />
    </div>
);


const PolicyItem = ({ title, content, index }: IPrivacyPolicy['details'][0] & { index: number }) => (
    <AccordionItem value={`policy-${index}`}>
        <AccordionTrigger className="text-left text-base font-medium">
            {title}
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground leading-relaxed">
            {content}
        </AccordionContent>
    </AccordionItem>
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
