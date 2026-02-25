import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function DataProtection({ eyebrow, title, subtitle, measures }: IDataProtection) {
    return (
        /* Using @container to scale layout based on its own width. 
           Responsive padding ensures it looks great on mobile and massive displays.
        */
        <Section className="px-4 py-16 md:py-24 @container overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12 @3xl:space-y-16">
                <div className="text-center">
                    <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
                </div>
                
                {/* Data-driven grid component */}
                <Grid measures={measures} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const Grid = ({ measures }: { measures: IMeasureItem[] }) => (
    /* Optimized Grid Strategy:
       - Default: 1 column (mobile)
       - @sm: 2 columns (standard tablet)
       - @3xl: 2 columns (wide tablet/small desktop - provides more breathing room)
       - @5xl: 3 columns (standard desktop)
       - @7xl: 3 columns (large screens)
    */
    <div className="grid grid-cols-1 @sm:grid-cols-2 @5xl:grid-cols-3 gap-6 @3xl:gap-8 @7xl:gap-10">
        {measures.map((measure, i) => (
            <MeasureCard key={i} {...measure} />
        ))}
    </div>
);

const MeasureCard = ({ icon: Icon, title, description, features }: IMeasureItem) => (
    /* Maintaining the original design style with enhanced responsive font scaling */
    <Card className="group h-full hover:border-primary/50 hover:shadow-md transition-all duration-300 border-border/60 bg-card">
        <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
                <IconBox icon={Icon} />
                <CardTitle className="text-lg @3xl:text-xl @7xl:text-2xl font-bold tracking-tight">
                    {title}
                </CardTitle>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-sm @3xl:text-base @7xl:text-lg text-muted-foreground leading-relaxed">
                {description}
            </p>
            {features && <FeatureList features={features} />}
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    /* Icon container grows slightly on larger viewports to match font scaling */
    <div className="size-12 @3xl:size-14 @7xl:size-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="size-6 @3xl:size-7 @7xl:size-8 text-primary" />
    </div>
);

const FeatureList = ({ features }: { features: string[] }) => (
    /* Clean feature list with professional bullet points */
    <ul className="space-y-2.5 pt-2">
        {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm @3xl:text-base @7xl:text-lg text-muted-foreground/90">
                <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.4)]" />
                <span className="leading-snug">{feature}</span>
            </li>
        ))}
    </ul>
);

// ============= TYPES =============
interface IMeasureItem {
    icon: LucideIcon;
    title: string;
    description: string;
    features?: string[];
}

interface IDataProtection {
    eyebrow: string;
    title: string;
    subtitle: string;
    measures: IMeasureItem[];
}