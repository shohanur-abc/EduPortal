import { ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Migration({ eyebrow, title, subtitle, steps, cta }: IMigration) {
    return (
        <Section className="px-4 py-12 md:py-20">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* হেডিং এবং সাবটাইটেল সব সময় সেন্টারে থাকবে */}
                <div className="text-center">
                    <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
                </div>
                
                <StepsGrid steps={steps} />
                <CtaButton cta={cta} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const StepsGrid = ({ steps }: { steps: IMigration['steps'] }) => (
    /* grid-cols-1: মোবাইলে ১টি বক্স (আপনার চাহিদা অনুযায়ী)
       md:grid-cols-2: ট্যাবলেটে ২টি বক্স
       lg:grid-cols-4: ডেস্কটপে ৪টি বক্স
    */
    <div className="grid grid-cols-1 @2xl:grid-cols-2 @6xl:grid-cols-4 gap-6 lg:gap-8 mb-12">
        {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} isLast={i === steps.length - 1} />
        ))}
    </div>
);

const StepCard = ({ step, index, isLast }: { step: IMigration['steps'][number]; index: number; isLast: boolean }) => (
    <div className="relative h-full">
        <Card className="h-full border-border/60 hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6 md:p-8 flex flex-col h-full space-y-4">
                <div className="flex items-center gap-4">
                    {/* স্টেপ কাউন্টার */}
                    <span className="size-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                        {index + 1}
                    </span>
                    {/* আইকন বক্স */}
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <step.icon className="size-6 text-primary" />
                    </div>
                </div>

                <div className="space-y-2 flex-grow">
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

        {/* অ্যারো আইকন: শুধুমাত্র বড় স্ক্রিনে (lg) দেখাবে। 
           মোবাইল বা ট্যাবলেটে এটি হাইড থাকবে যাতে ডিজাইন ক্লিন থাকে।
        */}
        {!isLast && (
            <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                <ArrowRight className="size-6 text-muted-foreground/30" />
            </div>
        )}
    </div>
);

const CtaButton = ({ cta }: { cta: IMigration['cta'] }) => (
    <div className="flex justify-center pt-4">
        <Button size="lg" className="rounded-full px-10 h-14 text-base font-bold transition-transform hover:scale-105" asChild>
            <Link href={cta.href}>
                {cta.text}
                <ArrowRight className="ml-2 size-5" />
            </Link>
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