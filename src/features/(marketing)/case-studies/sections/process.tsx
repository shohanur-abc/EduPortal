import { type LucideIcon } from '@/lib/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Process({ eyebrow, title, subtitle, steps }: IProcess) {
    return (
        <Section cols={4} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {steps.map((step, i) => (
                <StepCard key={i} step={step} index={i} isLast={i === steps.length - 1} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const StepCard = ({ step, index, isLast }: { step: IProcess['steps'][number]; index: number; isLast: boolean }) => (
    <div className="relative">
        <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                    <StepNumber number={index + 1} />
                    <StepIcon icon={step.icon} />
                </div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                <StepDuration duration={step.duration} />
            </CardContent>
        </Card>
        {!isLast && <StepConnector />}
    </div>
);

const StepNumber = ({ number }: { number: number }) => (
    <span className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
        {number}
    </span>
);

const StepIcon = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="size-5 text-primary" />
    </div>
);

const StepDuration = ({ duration }: { duration: string }) => (
    <span className="inline-block text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
        {duration}
    </span>
);

const StepConnector = () => (
    <div className="hidden @3xl:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" />
);

// ============= TYPES =============
interface IProcess {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: {
        icon: LucideIcon;
        title: string;
        description: string;
        duration: string;
    }[];
}
