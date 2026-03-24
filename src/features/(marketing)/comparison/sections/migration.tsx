import { ArrowRight, type LucideIcon } from '@/lib/icon';
import { Button } from "@/components/molecules";
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Migration({ eyebrow, title, subtitle, steps, cta }: IMigration) {
    return (
        <Section cols={4} title={title} subtitle={subtitle} eyebrow={eyebrow}>
            {steps.map((step, i) => (
                <StepCard key={i} step={step} index={i} isLast={i === steps.length - 1} />
            ))}
            <CtaButton cta={cta} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const StepCard = ({ step, index, isLast }: { step: IMigration['steps'][number]; index: number; isLast: boolean }) => (
    <div className="relative h-full">
        <Card className="h-full border-border/60 hover:shadow-xl transition-all duration-300 group py-0">
            <CardContent className="p-6 md:p-8 flex flex-col h-full space-y-4">
                <div className="flex items-center gap-4">
                    <span className="size-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                        {index + 1}
                    </span>
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <step.icon className="size-6 text-primary" />
                    </div>
                </div>

                <div className="space-y-2 grow">
                    <h3 className="text-xl font-bold text-foreground leading-tight">
                        {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {step.description}
                    </p>
                </div>

                {step.duration && (
                    <div className="pt-2">
                        <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                            {step.duration}
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>

        {!isLast && (
            <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                <ArrowRight className="size-6 text-muted-foreground/30" />
            </div>
        )}
    </div>
);

const CtaButton = ({ cta }: { cta: IMigration['cta'] }) => (
    <div className="flex justify-center pt-4 col-span-full">
        <Button size="lg" className="rounded-full px-10 h-14 text-base font-bold transition-transform hover:scale-105" href={cta.href} rightIcon={<ArrowRight className="size-5" />}>
{cta.text}
</Button>
    </div>
);

// ============= TYPES =============
interface IMigration {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: {
        icon: LucideIcon;
        title: string;
        description: string;
        duration?: string;
    }[];
    cta: { text: string; href: string };
}