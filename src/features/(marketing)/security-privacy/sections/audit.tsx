import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';

// ============= MAIN COMPONENT =============
export default function Audit({ eyebrow, title, subtitle, features }: IAudit) {
    return (
        /* Standard section using @container to scale elements based on section width.
           Padding dynamically adjusts from micro-devices up to ultra-wide screens.
        */
        <Section className="px-4 py-12 @xs:py-16 @lg:py-24 @container overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-10 @3xl:space-y-16">
                {/* Centralized Heading with padding for small screens */}
                <div className="text-center px-2">
                    <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
                </div>
                
                {/* Responsive grid for audit features */}
                <FeatureGrid features={features} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const FeatureGrid = ({ features }: { features: IAuditFeature[] }) => (
    /* Responsive Grid Strategy for all breakpoints:
       - @3xs to @xs: 1 column (Ensures clarity on narrow devices)
       - @sm to @4xl: 2 columns (Optimal for tablets and standard laptops)
       - @5xl to @7xl: 3 columns (Professional desktop layout)
    */
    <div className={cn(
        "grid gap-4 @sm:gap-6 @3xl:gap-8",
        "grid-cols-1", 
        "@sm:grid-cols-2", 
        "@5xl:grid-cols-3"
    )}>
        {features.map((feature, i) => (
            <AuditCard key={i} {...feature} />
        ))}
    </div>
);

const AuditCard = ({ icon: Icon, title, description, tag, capabilities }: IAuditFeature) => (
    /* Card layout with responsive scaling for internal padding and text sizes */
    <Card className="group h-full flex flex-col hover:border-primary/50 hover:shadow-md transition-all duration-300 border-border/60 bg-card">
        <CardHeader className="space-y-4 pt-6 @3xl:pt-8">
            <div className="flex items-center justify-between gap-4">
                <IconBox icon={Icon} />
                {tag && (
                    <Badge variant="outline" className="text-[9px] @sm:text-[10px] @3xl:text-xs font-bold uppercase tracking-wider">
                        {tag}
                    </Badge>
                )}
            </div>
            <div className="space-y-2">
                <CardTitle className="text-base @sm:text-lg @3xl:text-xl @7xl:text-2xl font-bold tracking-tight italic-none">
                    {title}
                </CardTitle>
                <CardDescription className="text-xs @sm:text-sm @3xl:text-base leading-relaxed italic-none">
                    {description}
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent className="mt-auto pb-6 @3xl:pb-8">
            {/* Capability breakdown with scaled list markers */}
            <CapabilityList capabilities={capabilities} />
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    /* Icon scaling from 3XS through 7XL viewports */
    <div className="size-11 @3xl:size-14 @7xl:size-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <Icon className="size-5 @3xl:size-7 @7xl:size-8 text-primary" />
    </div>
);

const CapabilityList = ({ capabilities }: { capabilities: string[] }) => (
    /* Technical capability list with consistent spacing across all devices */
    <ul className="space-y-2.5 @3xl:space-y-3 pt-4 border-t border-border/40">
        {capabilities.map((capability, i) => (
            <li key={i} className="flex items-start gap-3 text-xs @sm:text-sm @3xl:text-base text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary mt-1.5 @3xl:mt-2 shrink-0 shadow-sm" />
                <span className="leading-snug italic-none">{capability}</span>
            </li>
        ))}
    </ul>
);

// ============= TYPES =============
interface IAuditFeature {
    icon: LucideIcon;
    title: string;
    description: string;
    tag?: string;
    capabilities: string[];
}

interface IAudit {
    eyebrow: string;
    title: string;
    subtitle: string;
    features: IAuditFeature[];
}