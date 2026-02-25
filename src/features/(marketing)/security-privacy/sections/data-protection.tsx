import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';

// ============= MAIN COMPONENT =============
export default function DataProtection({ eyebrow, title, subtitle, measures }: IDataProtection) {
    return (
        /* Surgical precision with @container query from 3XS to 7XL.
           Padding scales to ensure the content never touches the edges on small or massive screens.
        */
        <Section className="px-4 py-12 @xs:py-16 @lg:py-24 @container overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-10 @3xl:space-y-16">
                <div className="text-center px-2">
                    <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
                </div>
                
                {/* Responsive grid for data protection measures */}
                <Grid measures={measures} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const Grid = ({ measures }: { measures: IMeasureItem[] }) => (
    /* Grid Logic for extreme responsiveness:
       - @3xs to @xs: 1 column
       - @sm to @4xl: 2 columns (better readability for detailed descriptions)
       - @5xl to @7xl: 3 columns (standard & large desktops)
    */
    <div className={cn(
        "grid gap-4 @sm:gap-6 @3xl:gap-8 @7xl:gap-10",
        "grid-cols-1",
        "@sm:grid-cols-1",
        "@5xl:grid-cols-3"
    )}>
        {measures.map((measure, i) => (
            <MeasureCard key={i} {...measure} />
        ))}
    </div>
);

const MeasureCard = ({ icon: Icon, title, description, features }: IMeasureItem) => (
    /* 100% original effect preserved with responsive font and spacing scaling */
    <Card className="group h-full flex flex-col hover:border-primary/50 hover:shadow-md transition-all duration-300 border-border/60 bg-card">
        <CardHeader className="pb-4 pt-6 @3xl:pt-8">
            <div className="flex items-center gap-4">
                <IconBox icon={Icon} />
                <CardTitle className="text-base @sm:text-lg @3xl:text-xl @7xl:text-2xl font-bold tracking-tight italic-none">
                    {title}
                </CardTitle>
            </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-6 @3xl:pb-8">
            <p className="text-xs @sm:text-sm @3xl:text-base @7xl:text-lg text-muted-foreground leading-relaxed italic-none">
                {description}
            </p>
            {features && <FeatureList features={features} />}
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    /* Icon container scales across all breakpoints from 3XS to 7XL */
    <div className="size-11 @3xl:size-14 @7xl:size-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="size-5 @3xl:size-7 @7xl:size-8 text-primary" />
    </div>
);

const FeatureList = ({ features }: { features: string[] }) => (
    /* Bullet points with responsive typography and spacing */
    <ul className="space-y-2.5 pt-2 border-t border-border/40">
        {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-xs @sm:text-sm @3xl:text-base @7xl:text-lg text-muted-foreground/90">
                <span className="size-1.5 rounded-full bg-primary mt-1.5 @3xl:mt-2 shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.4)]" />
                <span className="leading-snug italic-none">{feature}</span>
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