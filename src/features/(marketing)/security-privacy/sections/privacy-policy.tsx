import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function PrivacyPolicy({ eyebrow, title, subtitle, highlights, details }: IPrivacyPolicy) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <div className="grid grid-cols-1 @xl:grid-cols-2 gap-10">
                <HighlightList highlights={highlights} />
                <PolicyDetails details={details} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const HighlightList = ({ highlights }: { highlights: IHighlightItem[] }) => (
    <div className="space-y-4">
        {highlights.map((item, i) => (
            <HighlightCard key={i} {...item} />
        ))}
    </div>
);

const HighlightCard = ({ icon: Icon, title, description }: IHighlightItem) => (
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

const PolicyDetails = ({ details }: { details: IPolicyDetail[] }) => (
    <div className="flex items-start">
        <Accordion type="single" collapsible className="w-full">
            {details.map((detail, i) => (
                <PolicyItem key={i} index={i} {...detail} />
            ))}
        </Accordion>
    </div>
);

const PolicyItem = ({ title, content, index }: IPolicyDetail & { index: number }) => (
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
interface IHighlightItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface IPolicyDetail {
    title: string;
    content: string;
}

interface IPrivacyPolicy {
    eyebrow: string;
    title: string;
    subtitle: string;
    highlights: IHighlightItem[];
    details: IPolicyDetail[];
}
