import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function IncidentResponse({ eyebrow, title, subtitle, steps }: IIncidentResponse) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <StepTimeline steps={steps} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const StepTimeline = ({ steps }: { steps: IResponseStep[] }) => (
    <div className="max-w-4xl mx-auto space-y-0">
        {steps.map((step, i) => (
            <StepCard key={i} index={i} isLast={i === steps.length - 1} {...step} />
        ))}
    </div>
);

const StepCard = ({ icon: Icon, title, description, timeline, details, index, isLast }: IResponseStep & { index: number; isLast: boolean }) => (
    <div className="flex gap-4 @sm:gap-6">
        <StepIndicator icon={Icon} index={index} isLast={isLast} />
        <Card className="flex-1 mb-6 group hover:border-primary/50 hover:shadow-md transition-all">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    {timeline && (
                        <span className="text-xs text-primary font-medium bg-primary/10 px-2.5 py-1 rounded-full">
                            {timeline}
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                {details && <DetailList details={details} />}
            </CardContent>
        </Card>
    </div>
);

const StepIndicator = ({ icon: Icon, isLast }: { icon: LucideIcon; index: number; isLast: boolean }) => (
    <div className="flex flex-col items-center">
        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border-2 border-primary/30">
            <Icon className="size-5 text-primary" />
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-border" />}
    </div>
);

const DetailList = ({ details }: { details: string[] }) => (
    <ul className="space-y-1.5">
        {details.map((detail, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                {detail}
            </li>
        ))}
    </ul>
);

// ============= TYPES =============
interface IResponseStep {
    icon: LucideIcon;
    title: string;
    description: string;
    timeline?: string;
    details?: string[];
}

interface IIncidentResponse {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: IResponseStep[];
}
