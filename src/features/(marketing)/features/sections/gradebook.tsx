import { type LucideIcon, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';

// ============= MAIN COMPONENT =============
export default function Gradebook({ eyebrow, title, description, image, highlights, direction = 'rtl' }: IFeatureDetail) {
    return (
        /* Using @container for precise layout control. Added a subtle overflow hidden for the glow effect. */
        <Section className="px-4 py-12 @xs:py-16 @lg:py-24 @container overflow-hidden">
            <div className={cn(
                "max-w-7xl mx-auto grid grid-cols-1 gap-12 @3xl:gap-16 items-center",
                /* Using the same grid ratio as Attendance for visual consistency */
                "@6xl:grid-cols-[1.1fr_0.9fr] @7xl:gap-24", 
                direction === 'rtl' ? "@6xl:[&>*:first-child]:order-last" : ""
            )}>
                {/* Visual Content Block */}
                <ImageBlock src={image.src} alt={image.alt} />
                
                {/* Textual Content Block */}
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
    /* Controlled image sizing to prevent stretching on large viewports */
    <div className="relative group w-full max-w-[500px] @3xl:max-w-[600px] @6xl:max-w-full mx-auto">
        {/* Aesthetic background glow */}
        <div className="absolute -inset-6 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative aspect-square @sm:aspect-[4/3] @3xl:aspect-[16/10] @6xl:aspect-square w-full rounded-[2rem] overflow-hidden border border-border/60 bg-muted shadow-2xl">
            <Image 
                src={src || "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=1200"} 
                alt={alt} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 700px"
                priority
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem]" />
        </div>
    </div>
);

const ContentBlock = ({ eyebrow, title, description, highlights }: Omit<IFeatureDetail, 'image' | 'direction'>) => (
    /* Centers everything on mobile, switches to left-align on desktop container (@6xl) */
    <div className="flex flex-col items-center @6xl:items-start justify-center text-center @6xl:text-left @6xl:max-w-xl @7xl:max-w-2xl ">
        <div className="space-y-4">
            <Badge variant="secondary" className="w-fit rounded-full px-4 py-1.5 text-[10px] @xs:text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border-none">
                {eyebrow}
            </Badge>
            <h2 className="text-3xl @xl:text-4xl @5xl:text-5xl @7xl:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] @7xl:leading-[1.05]">
                {title}
            </h2>
            <p className="text-muted-foreground text-sm @xs:text-base @xl:text-lg @7xl:text-xl leading-relaxed max-w-[60ch]">
                {description}
            </p>
        </div>

        <HighlightsList highlights={highlights} />
    </div>
);

const HighlightsList = ({ highlights }: { highlights: IHighlight[] }) => (
    /* Consistent list styling with a controlled container width */
    <ul className="grid grid-cols-1 gap-y-6 @3xl:gap-y-8 pt-8 border-t border-border/50 w-full max-w-[500px] @6xl:max-w-full mx-auto @6xl:mx-0">
        {highlights.map((item, i) => (
            <HighlightItem key={i} {...item} />
        ))}
    </ul>
);

const HighlightItem = ({ icon: Icon = CheckCircle, text }: IHighlight) => (
    /* Modern row layout on ultra-wide screens (@7xl), centered column stack on mobile */
    <li className="flex items-center @7xl:flex-row @7xl:items-start gap-4 group">
        <div className="bg-primary/10 p-2 @7xl:p-2.5 rounded-xl @7xl:rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 flex items-center justify-center shadow-sm">
            <Icon className="size-5 @3xl:size-5 @7xl:size-6" />
        </div>
        <span className="text-sm @xl:text-base @7xl:text-lg text-foreground/90 font-semibold @6xl:font-medium leading-relaxed italic-none @7xl:text-left @7xl:pt-0.5 text-start">
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