import { CheckCircle2, X, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function FeatureSpotlight({ eyebrow, title, subtitle, spotlights }: IFeatureSpotlight) {
    return (
        /* Section-এ @container যোগ করা হয়েছে */
        <Section className="px-4 py-12 @container overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-10 @3xl:space-y-16">
                <div className="text-center max-w-3xl mx-auto">
                    <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
                </div>
                
                <SpotlightTabs spotlights={spotlights} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const SpotlightTabs = ({ spotlights }: { spotlights: IFeatureSpotlight['spotlights'] }) => (
    <Tabs defaultValue={spotlights[0]?.id} className="w-full space-y-8">
        <div className="flex justify-center w-full">
            <TabsList className="flex h-auto p-1 bg-muted/50 overflow-x-auto justify-start @3xl:justify-center no-scrollbar max-w-full border border-border/40">
                {spotlights.map((spotlight) => (
                    <TabsTrigger 
                        key={spotlight.id} 
                        value={spotlight.id} 
                        className="gap-2 px-4 py-2 text-sm @3xl:text-base whitespace-nowrap"
                    >
                        <spotlight.icon className="size-4 shrink-0" />
                        <div className='hidden @3xl:block'>
                            {spotlight.label}
                        </div>
                    </TabsTrigger>
                ))}
            </TabsList>
        </div>
        
        {spotlights.map((spotlight) => (
            <TabsContent key={spotlight.id} value={spotlight.id} className="outline-none focus-visible:ring-0">
                <SpotlightContent spotlight={spotlight} />
            </TabsContent>
        ))}
    </Tabs>
);

const SpotlightContent = ({ spotlight }: { spotlight: IFeatureSpotlight['spotlights'][number] }) => (
    <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-8 @5xl:gap-16 items-start">
        <FeatureDetail
            title={spotlight.title}
            description={spotlight.description}
            highlights={spotlight.highlights}
        />
        <ComparisonDetails comparisons={spotlight.comparisons} />
    </div>
);

const FeatureDetail = ({ title, description, highlights }: {
    title: string;
    description: string;
    highlights: string[];
}) => (
    <div className="space-y-6">
        {/* কন্টেইনার ছোট থাকলে সেন্টার, বড় হলে লেফট অ্যালাইন */}
        <div className="space-y-4 text-center @3xl:text-left">
            <h3 className="text-2xl @2xl:text-3xl @5xl:text-4xl font-bold tracking-tight text-foreground">
                {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-base @3xl:text-lg">
                {description}
            </p>
        </div>
        
        <div className="grid grid-cols-1 @xl:grid-cols-2 gap-3 pt-2">
            {highlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-3 justify-start">
                    <CheckCircle2 className="size-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm @3xl:text-base text-foreground font-medium">{highlight}</span>
                </div>
            ))}
        </div>
    </div>
);

const ComparisonDetails = ({ comparisons }: { comparisons: IFeatureSpotlight['spotlights'][number]['comparisons'] }) => (
    <div className="space-y-4 w-full">
        {comparisons.map((comparison, i) => (
            <ComparisonCard key={i} {...comparison} />
        ))}
    </div>
);

const ComparisonCard = ({ competitor, ourFeature, theirFeature, verdict }: IFeatureSpotlight['spotlights'][number]['comparisons'][number]) => (
    <Card className="overflow-hidden border-border/60 shadow-sm transition-all duration-300 hover:border-primary/20">
        <CardHeader className="bg-muted/30 py-2.5 px-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                vs {competitor}
            </h4>
        </CardHeader>
        <CardContent className="p-4 @3xl:p-6 space-y-4">
            {/* Our Solution */}
            <div className="flex items-start gap-3">
                <CheckCircle2 className="size-4 @3xl:size-5 text-green-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-green-600 uppercase">Our Feature</span>
                    <p className="text-sm @3xl:text-base text-foreground font-medium leading-tight">{ourFeature}</p>
                </div>
            </div>
            
            {/* Their Solution */}
            <div className="flex items-start gap-3 opacity-75">
                <X className="size-4 @3xl:size-5 text-muted-foreground/60 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Their Feature</span>
                    <p className="text-sm @3xl:text-base text-muted-foreground leading-tight">{theirFeature}</p>
                </div>
            </div>
            
            {verdict && (
                <div className="pt-2 border-t border-dashed border-border/60">
                    <p className="text-xs @3xl:text-sm font-semibold text-primary italic">
                        Result: {verdict}
                    </p>
                </div>
            )}
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IFeatureSpotlight {
    eyebrow: string;
    title: string;
    subtitle: string;
    spotlights: {
        id: string;
        label: string;
        icon: LucideIcon;
        title: string;
        description: string;
        highlights: string[];
        comparisons: {
            competitor: string;
            ourFeature: string;
            theirFeature: string;
            verdict?: string;
        }[];
    }[];
}