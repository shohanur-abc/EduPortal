import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';

// ============= MAIN COMPONENT =============
export default function MobileApp({ eyebrow, title, description, features, cta }: IMobileApp) {
    return (
        /* Enhanced background with a subtle primary tint for better contrast */
        <Section className="px-4 py-12 @xs:py-16 @lg:py-24 @container from-muted/50 to-background overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 @4xl:grid-cols-2 gap-12 @4xl:gap-20 items-center">
                
                {/* Visual Phone Representation - Centered on mobile, left on desktop */}
                <div className="order-2 @4xl:order-1 flex justify-center">
                    <PhoneMockup />
                </div>

                {/* Information Content Block - Centered text on mobile for better flow */}
                <div className="order-1 @4xl:order-2">
                    <ContentBlock 
                        eyebrow={eyebrow} 
                        title={title} 
                        description={description} 
                        features={features} 
                        cta={cta} 
                    />
                </div>
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const ContentBlock = ({ eyebrow, title, description, features, cta }: Omit<IMobileApp, never>) => (
    <div className="flex flex-col items-center @4xl:items-start space-y-6 @3xl:space-y-8 text-center @4xl:text-left">
        <div className="space-y-4">
            <Badge variant="outline" className="w-fit rounded-full px-4 py-1.5 text-[10px] @xs:text-xs font-bold uppercase tracking-widest bg-primary/10 border-primary/20 text-primary">
                {eyebrow}
            </Badge>
            <h2 className="text-3xl @xl:text-4xl @5xl:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                {title}
            </h2>
            <p className="text-muted-foreground text-sm @xs:text-base @xl:text-lg leading-relaxed max-w-[55ch]">
                {description}
            </p>
        </div>

        <FeatureList features={features} />

        {cta && (
            <div className="pt-4">
                <Button size="lg" className="rounded-full px-8 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 active:scale-95" asChild>
                    <Link href={cta.href}>{cta.text}</Link>
                </Button>
            </div>
        )}
    </div>
);

const FeatureList = ({ features }: { features: IMobileFeature[] }) => (
    /* Maintained single column, but centered on small devices */
    <div className="grid grid-cols-1 gap-y-6 pt-6 border-t border-border/60 w-full max-w-[500px] @4xl:max-w-full">
        {features.map((feature, i) => (
            <FeatureItem key={i} {...feature} />
        ))}
    </div>
);

const FeatureItem = ({ icon: Icon, title, description }: IMobileFeature) => (
    <div className="flex flex-col @xs:flex-row items-center @4xl:items-start gap-4 group">
        {/* Dynamic Icon Box with Primary/Accent Colors */}
        <div className="size-12 @xl:size-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
            <Icon className="size-6 @xl:size-7 text-primary group-hover:text-inherit" />
        </div>
        <div className="space-y-1">
            <p className="text-base @xl:text-lg font-bold text-foreground leading-tight">{title}</p>
            <p className="text-xs @xs:text-sm text-muted-foreground leading-relaxed italic-none">{description}</p>
        </div>
    </div>
);

const PhoneMockup = () => (
    <div className="flex items-center justify-center relative w-full max-w-[350px] @container/phone">
        {/* Animated Glow effect */}
        <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[80px] @7xl:blur-[120px] opacity-40 animate-pulse" />
        
        {/* Phone Frame with consistent Primary accents */}
        <div className="relative w-full aspect-[9/18.5] rounded-[3rem] border-[10px] border-zinc-900 bg-zinc-950 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 inset-x-0 h-7 flex items-center justify-center z-20">
                <div className="w-24 h-5 bg-zinc-900 rounded-b-2xl shadow-inner" />
            </div>
            
            {/* Mock App Interface with better color depth */}
            <div className="absolute inset-2 rounded-[2.2rem] bg-background flex flex-col items-center justify-center overflow-hidden">
                <div className="text-center space-y-6 px-6 w-full">
                    <div className="size-20 rounded-[2rem] bg-gradient-to-br from-primary/20 to-primary/5 mx-auto flex items-center justify-center shadow-inner">
                        <div className="size-10 rounded-xl bg-primary/40 animate-bounce" />
                    </div>
                    
                    <div className="space-y-3">
                        <div className="h-3 bg-muted rounded-full w-3/4 mx-auto" />
                        <div className="h-2.5 bg-muted/60 rounded-full w-1/2 mx-auto" />
                    </div>
                    
                    <div className="space-y-3 pt-4 w-full">
                        <div className="h-14 bg-primary/5 border border-primary/10 rounded-2xl w-full shadow-sm" />
                        <div className="h-14 bg-muted/30 rounded-2xl w-full" />
                    </div>
                </div>

                {/* Bottom Indicator */}
                <div className="absolute bottom-3 w-1/3 h-1 bg-zinc-300/20 rounded-full" />
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