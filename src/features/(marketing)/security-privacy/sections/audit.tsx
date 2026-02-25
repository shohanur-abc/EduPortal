import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Audit({ eyebrow, title, subtitle, features }: IAudit) {
    return (
        /* Standard section without background colors as requested.
           Using @container to ensure elements scale relative to the section width.
        */
        <Section className="px-4 py-16 md:py-24 @container overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12 @3xl:space-y-16">
                {/* Centralized Heading */}
                <div className="text-center">
                    <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
                </div>
                
                {/* Audit features grid */}
                <FeatureGrid features={features} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const FeatureGrid = ({ features }: { features: IAuditFeature[] }) => (
    /* Optimized responsiveness:
       - 1 column on mobile
       - 2 columns on @sm to @3xl (providing better space for capability lists)
       - 3 columns on @5xl and above for standard desktop view
    */
    <div className="grid grid-cols-1 @sm:grid-cols-2 @5xl:grid-cols-3 gap-6 @3xl:gap-8">
        {features.map((feature, i) => (
            <AuditCard key={i} {...feature} />
        ))}
    </div>
);

const AuditCard = ({ icon: Icon, title, description, tag, capabilities }: IAuditFeature) => (
    /* Card design with subtle hover interaction and responsive height */
    <Card className="group h-full flex flex-col hover:border-primary/50 hover:shadow-md transition-all duration-300 border-border/60">
        <CardHeader className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <IconBox icon={Icon} />
                {tag && (
                    <Badge variant="outline" className="text-[10px] @3xl:text-xs font-bold uppercase tracking-wider">
                        {tag}
                    </Badge>
                )}
            </div>
            <div className="space-y-2">
                <CardTitle className="text-lg @3xl:text-xl font-bold tracking-tight italic-none">
                    {title}
                </CardTitle>
                <CardDescription className="text-sm @3xl:text-base leading-relaxed italic-none">
                    {description}
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent className="mt-auto">
            {/* Detailed capability breakdown */}
            <CapabilityList capabilities={capabilities} />
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    /* Icon container that adjusts based on container width */
    <div className="size-12 @3xl:size-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <Icon className="size-6 @3xl:size-7 text-primary" />
    </div>
);

const CapabilityList = ({ capabilities }: { capabilities: string[] }) => (
    /* List of technical capabilities with consistent markers */
    <ul className="space-y-3 pt-4 border-t border-border/40">
        {capabilities.map((capability, i) => (
            <li key={i} className="flex items-start gap-3 text-sm @3xl:text-base text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-sm" />
                <span className="leading-snug">{capability}</span>
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