import { type LucideIcon, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';

// ============= MAIN COMPONENT =============
export default function Communication({ eyebrow, title, description, image, highlights, direction = 'ltr' }: IFeatureDetail) {
    return (
        /* Using @container for precise control across all breakpoints. Overflow-hidden ensures clean glow effects. */
        <Section className="px-4 py-12 @xs:py-16 @lg:py-24 @container overflow-hidden">
            <div className={cn(
                "max-w-7xl mx-auto grid grid-cols-1 gap-12 @3xl:gap-16 items-center",
                /* Maintaining the standard grid ratio: slightly more weight to image on large screens */
                "@6xl:grid-cols-[1.1fr_0.9fr] @7xl:gap-24", 
                direction === 'rtl' ? "@6xl:[&>*:first-child]:order-last" : ""
            )}>
                {/* Image Block: Adaptive sizing for desktop and mobile viewports */}
                <ImageBlock src={image.src} alt={image.alt} />
                
                {/* Content Block: Balanced text width for ultra-wide reading comfort */}
                <ContentBlock 
                    eyebrow={eyebrow} 
                    title={title} 
                    description={description} 
                    highlights={highlights} 
                />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const ImageBlock = ({ src, alt }: { src: string; alt: string }) => (
    /* Constrains width on ultra-wide screens to keep the layout professional */
    <div className="relative group w-full max-w-[500px] @3xl:max-w-[600px] @6xl:max-w-full mx-auto">
        {/* Dynamic background glow on hover */}
        <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative aspect-square @sm:aspect-[4/3] @3xl:aspect-video @6xl:aspect-square w-full rounded-3xl overflow-hidden border border-border/50 bg-muted shadow-2xl">
            <Image 
                src={src || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"} 
                alt={alt} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px" 
                priority
            />
        </div>
    </div>
);

const ContentBlock = ({ eyebrow, title, description, highlights }: Omit<IFeatureDetail, 'image' | 'direction'>) => (
    /* Auto-centering on mobile, start-alignment on @6xl container widths */
    <div className="flex flex-col items-center @6xl:items-start justify-center text-center @6xl:text-left @6xl:max-w-xl @7xl:max-w-2xl">
        <div className="space-y-4">
            <Badge variant="outline" className="w-fit rounded-full px-4 py-1.5 text-[10px] @xs:text-xs font-bold uppercase tracking-widest bg-primary/10 border-primary/20 text-primary">
                {eyebrow}
            </Badge>
            <h2 className="text-3xl @xl:text-4xl @5xl:text-5xl @7xl:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                {title}
            </h2>
            <p className="text-muted-foreground text-sm @xs:text-base @xl:text-lg @7xl:text-xl leading-relaxed max-w-[55ch]">
                {description}
            </p>
        </div>

        <HighlightsList highlights={highlights} />
    </div>
);

const HighlightsList = ({ highlights }: { highlights: IHighlight[] }) => (
    /* Increased gap and top border for distinct separation from description */
    <ul className="grid grid-cols-1 gap-y-6 @3xl:gap-y-8 pt-8 border-t border-border/40 w-full max-w-[500px] @6xl:max-w-full mx-auto @6xl:mx-0">
        {highlights.map((item, i) => (
            <HighlightItem key={i} {...item} />
        ))}
    </ul>
);

const HighlightItem = ({ icon: Icon = CheckCircle, text }: IHighlight) => (
    /* Compact row layout for 7XL, centered stack for mobile and tablets */
    <li className="flex items-center @7xl:flex-row @7xl:items-start gap-4 group">
        <div className="bg-primary/10 p-2 @7xl:p-2.5 rounded-xl @7xl:rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 flex items-center justify-center">
            {/* Reduced icon size for a cleaner look, matching previous adjustments */}
            <Icon className="size-5 @3xl:size-5 @7xl:size-6" />
        </div>
        
        <span className="text-sm @xl:text-base @7xl:text-lg text-foreground/85 font-semibold @6xl:font-medium leading-relaxed italic-none @7xl:text-left @7xl:pt-0.5 text-start">
            {text}
        </span>
    </li>
);

// ============= TYPES =============
interface IHighlight {
    icon?: LucideIcon;
    text: string;
}

interface IFeatureDetail {
    eyebrow: string;
    title: string;
    description: string;
    image: { src: string; alt: string };
    highlights: IHighlight[];
    direction?: 'ltr' | 'rtl';
}