import { type LucideIcon } from 'lucide-react';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function HowItWorks({ eyebrow, title, subtitle, steps }: IHowItWorks) {
    return (
        <Section containerClass="bg-muted/50">
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <StepList steps={steps} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const StepList = ({ steps }: { steps: IStep[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-8 @xl:gap-6">
        {steps.map((step, i) => (
            <StepItem key={i} index={i} total={steps.length} {...step} />
        ))}
    </div>
);

const StepItem = ({ icon: Icon, title, description, index, total }: IStep & { index: number; total: number }) => (
    <div className="relative flex flex-col items-center text-center space-y-4">
        {index < total - 1 && <Connector />}
        <StepNumber number={index + 1} icon={Icon} />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{description}</p>
    </div>
);

const StepNumber = ({ number, icon: Icon }: { number: number; icon: LucideIcon }) => (
    <div className="relative">
        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Icon className="size-8 text-primary" />
        </div>
        <span className="absolute -top-2 -right-2 size-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
            {number}
        </span>
    </div>
);

const Connector = () => (
    <div className="hidden @xl:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px border-t-2 border-dashed border-primary/20" />
);

// ============= TYPES =============
interface IStep {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface IHowItWorks {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: IStep[];
}
