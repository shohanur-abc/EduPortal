import { ArrowRight } from '@/lib/icon';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils'; // Standard shadcn utility

// ============= MAIN COMPONENT =============
export default function IntegrationsPreview({ eyebrow, title, subtitle, integrations, cta }: IIntegrationsPreview) {
    return (
        /* Using @container for precise grid control based on section width */
        <Section className="px-4 py-16 md:py-24 @container overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
                {/* Header section with centralized alignment */}
                <div className="text-center space-y-3">
                    <Badge variant='ghost' className="text-sm font-semibold tracking-widest text-primary border-input block mx-auto">{eyebrow}</Badge>
                    <h2 className="text-3xl @lg:text-4xl @4xl:text-5xl font-bold tracking-tight text-foreground text-center">{title}</h2>
                    <p className="mx-auto text-base text-muted-foreground @lg:text-lg text-center">{subtitle}</p>
                </div>

                {/* Grid of integration logos and names */}
                <LogosGrid integrations={integrations} />

                {/* Call to Action Button */}
                {cta && <CTALink {...cta} />}
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const LogosGrid = ({ integrations }: { integrations: IIntegration[] }) => (
    /* Responsive column logic: 
       - Mobile: 2 columns 
       - Tablets: 3 to 4 columns
       - Desktop: 6 columns 
    */
    <div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 @5xl:grid-cols-6 gap-4 @xl:gap-6">
        {integrations.map((integration, i) => (
            <LogoCard key={i} {...integration} />
        ))}
    </div>
);

const LogoCard = ({ name, logo, description }: IIntegration) => (
    /* Interactive card with hover effects and glass-morphism hints */
    <div className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-background hover:border-primary/40 hover:shadow-xl transition-all duration-300 group text-center">
        <div className="size-14 relative shrink-0 p-1 group-hover:scale-110 transition-transform duration-500">
            <Image
                src={logo || "/placeholder.svg"}
                alt={`${name} logo`}
                fill
                className="object-contain"
                sizes="56px"
                unoptimized // Useful if using direct SVG links from external CDNs
            />
        </div>
        <div className="space-y-1">
            <p className="text-sm font-bold text-foreground leading-tight">{name}</p>
            {description && (
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-1">
                    {description}
                </p>
            )}
        </div>
    </div>
);

const CTALink = ({ text, href }: { text: string; href: string }) => (
    <div className="flex justify-center pt-4">
        <Button size="lg" className="rounded-full px-10 group shadow-md hover:shadow-primary/20 transition-all" asChild>
            <Link href={href}>
                {text}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </Button>
    </div>
);

// ============= TYPES =============
interface IIntegration {
    name: string;
    logo: string;
    description?: string;
}

interface IIntegrationsPreview {
    eyebrow: string;
    title: string;
    subtitle: string;
    integrations: IIntegration[];
    cta?: { text: string; href: string };
}