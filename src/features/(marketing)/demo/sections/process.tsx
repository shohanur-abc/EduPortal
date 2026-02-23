import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function DemoProcess({ eyebrow, title, subtitle, steps }: IDemoProcess) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <StepsList steps={steps} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const StepsList = ({ steps }: { steps: IDemoProcess['steps'] }) => (
    <div className="grid grid-cols-1 @3xl:grid-cols-2 @5xl:grid-cols-4 gap-6">
        {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} isLast={i === steps.length - 1} />
        ))}
    </div>
);

const StepCard = ({ step, index, isLast }: { step: IProcessStep; index: number; isLast: boolean }) => (
    <div className="relative">
        <Card className="h-full py-0">
            <CardContent className="pt-8 pb-6 space-y-4 text-center">
                <StepNumber number={index + 1} />
                <StepIcon icon={step.icon} />
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                {step.duration && (
                    <span className="inline-block text-xs text-primary font-medium bg-primary/10 rounded-full px-3 py-1">
                        {step.duration}
                    </span>
                )}
            </CardContent>
        </Card>
        {!isLast && <Connector />}
    </div>
);

const StepNumber = ({ number }: { number: number }) => (
    <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto">
        {number}
    </div>
);

const StepIcon = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
        <Icon className="size-6 text-primary" />
    </div>
);

const Connector = () => (
    <div className="hidden @3xl:block absolute top-1/2 -right-3 -translate-y-1/2">
        <div className="w-6 h-px bg-border" />
    </div>
);

// ============= TYPES =============
interface IDemoProcess {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: IProcessStep[];
}

interface IProcessStep {
    icon: LucideIcon;
    title: string;
    description: string;
    duration?: string;
}
