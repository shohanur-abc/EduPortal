import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';
import Heading from '@/components/heading';

// ============= MAIN COMPONENT =============
export default function HowItWorks({ eyebrow, title, subtitle, steps }: IHowItWorks) {
    return (
        <Section containerClass="bg-muted/50">
            <div className="space-y-16">
                <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
                <StepsList steps={steps} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const StepsList = ({ steps }: { steps: IHowItWorks['steps'] }) => (
    <div className="space-y-20">
        {steps.map((step, i) => (
            <StepItem key={i} {...step} index={i} reversed={i % 2 !== 0} />
        ))}
    </div>
);

const StepItem = ({ number, title, description, features, image, reversed }: IHowItWorks['steps'][number] & { index: number; reversed: boolean }) => (
    <div className={`grid grid-cols-1 @3xl:grid-cols-2 gap-12 items-center ${reversed ? '@3xl:[direction:rtl]' : ''}`}>
        <div className="space-y-6 @3xl:[direction:ltr]">
            <Badge variant="outline" className="rounded-full text-primary border-primary/30">Step {number}</Badge>
            <h3 className="text-2xl @sm:text-3xl font-bold">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
            <ul className="space-y-3">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="size-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border bg-background shadow-lg @3xl:[direction:ltr]">
            <Image src={image} alt={title} fill className="object-cover" />
        </div>
    </div>
);

// ============= TYPES =============
interface IHowItWorks {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: {
        number: string;
        title: string;
        description: string;
        features: string[];
        image: string;
    }[];
}
