import { type LucideIcon } from '@/lib/icon';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils'; // Standard shadcn utility

// ============= MAIN COMPONENT =============
export default function MobileApp({ eyebrow, title, description, features, cta }: IMobileApp) {
    return (
        /* Using @container for responsive control and a subtle background for contrast */
        <Section className="px-4 py-16 md:py-24 @container bg-muted/30 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 @4xl:grid-cols-2 gap-12 @4xl:gap-20 items-center">
                {/* Visual Phone Representation */}
                <PhoneMockup />

                {/* Information Content Block */}
                <ContentBlock
                    eyebrow={eyebrow}
                    title={title}
                    description={description}
                    features={features}
                    cta={cta}
                />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const ContentBlock = ({ eyebrow, title, description, features, cta }: Omit<IMobileApp, never>) => (
    <div className="flex flex-col justify-center space-y-6 @3xl:space-y-8">
        <div className="space-y-4">
            <Badge variant="outline" className="w-fit rounded-full px-4 py-1.5 text-[10px] @xs:text-xs font-bold uppercase tracking-widest bg-primary/5 border-primary/20 text-primary">
                {eyebrow}
            </Badge>
            <h2 className="text-3xl @2xl:text-4xl @5xl:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                {title}
            </h2>
            <p className="text-muted-foreground text-base @xl:text-lg leading-relaxed max-w-[55ch]">
                {description}
            </p>
        </div>

        <FeatureList features={features} />

        {cta && (
            <div className="pt-4">
                <Button size="lg" className="rounded-full px-8 shadow-lg transition-all" asChild>
                    <Link href={cta.href}>{cta.text}</Link>
                </Button>
            </div>
        )}
    </div>
);

const FeatureList = ({ features }: { features: IMobileFeature[] }) => (
    /* Changed to single column layout to maintain consistency across the site */
    <div className="grid grid-cols-1 gap-y-6 pt-6 border-t border-border/40">
        {features.map((feature, i) => (
            <FeatureItem key={i} {...feature} />
        ))}
    </div>
);

const FeatureItem = ({ icon: Icon, title, description }: IMobileFeature) => (
    <div className="flex items-start gap-4 group">
        <div className="size-12 rounded-xl bg-background border border-border/50 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-secondary group-hover:text-accent-foreground transition-all duration-300">
            <Icon className="size-6" />
        </div>
        <div className="space-y-1">
            <p className="text-base font-bold text-foreground leading-none">{title}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
    </div>
);

const PhoneMockup = () => (
    /* A more realistic phone frame with decorative elements */
    <div className="flex items-center justify-center relative @container/phone">
        {/* Glow effect behind the phone */}
        <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] opacity-50" />

        <div className="relative w-[280px] @sm:w-[320px] aspect-[9/19] rounded-[3rem] border-[8px] border-foreground/10 bg-black shadow-2xl overflow-hidden ring-4 ring-foreground/5">
            {/* Speaker/Camera Notch */}
            <div className="absolute top-0 inset-x-0 h-6 flex items-center justify-center z-20">
                <div className="w-20 h-4 bg-black rounded-b-xl" />
            </div>

            {/* Placeholder for actual App UI Image or content */}
            <div className="absolute inset-2 rounded-[2.2rem] bg-background flex items-center justify-center overflow-hidden">
                <div className="text-center space-y-4 px-6">
                    <div className="size-16 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center animate-pulse">
                        <div className="size-8 rounded-lg bg-primary/30" />
                    </div>
                    <div className="space-y-3">
                        <div className="h-3 bg-muted rounded-full w-32 mx-auto" />
                        <div className="h-2 bg-muted/60 rounded-full w-24 mx-auto" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-4">
                        <div className="h-20 bg-muted/40 rounded-xl" />
                        <div className="h-20 bg-muted/40 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// ============= TYPES =============
interface IMobileFeature {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface IMobileApp {
    eyebrow: string;
    title: string;
    description: string;
    features: IMobileFeature[];
    cta?: { text: string; href: string };
}