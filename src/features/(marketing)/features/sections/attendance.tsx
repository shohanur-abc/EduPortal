import { type LucideIcon, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils'; // Standard shadcn utility

// ============= MAIN COMPONENT =============
export default function Attendance({ eyebrow, title, description, image, highlights, direction = 'ltr' }: IFeatureDetail) {
    return (
        /* Added @container class for responsive layouts based on parent width */
        <Section className="px-4 py-12 md:py-20 @container overflow-hidden">
            <div className={cn(
                "grid grid-cols-1 gap-10 @3xl:gap-16 items-center",
                "@3xl:grid-cols-2", // Switch to 2 columns when container is large
                direction === 'rtl' ? "@3xl:[&>*:first-child]:order-last" : ""
            )}>
                {/* Image Block */}
                <ImageBlock src={image.src} alt={image.alt} />
                
                {/* Content Block */}
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
    <div className="relative group @container/img">
        {/* Decorative glow behind the image */}
        <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative aspect-[4/3] @3xl:aspect-square w-full rounded-3xl overflow-hidden border border-border/50 bg-muted shadow-2xl">
            <Image 
                src={src || "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=1200"} 
                alt={alt} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                sizes="(max-width: 768px) 100vw, 50vw" 
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
        </div>
    </div>
);

const ContentBlock = ({ eyebrow, title, description, highlights }: Omit<IFeatureDetail, 'image' | 'direction'>) => (
    <div className="flex flex-col justify-center space-y-6 @3xl:space-y-8">
        <div className="space-y-4">
            <Badge variant="outline" className="w-fit rounded-full px-4 py-1.5 text-[10px] @xs:text-xs font-bold uppercase tracking-widest bg-primary/5 border-primary/20 text-primary">
                {eyebrow}
            </Badge>
            <h2 className="text-3xl @xl:text-4xl @5xl:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                {title}
            </h2>
            <p className="text-muted-foreground text-base @xl:text-lg leading-relaxed max-w-[55ch]">
                {description}
            </p>
        </div>

        <HighlightsList highlights={highlights} />
    </div>
);

const HighlightsList = ({ highlights }: { highlights: IHighlight[] }) => (
    /* Updated: grid-cols-1 ensures single column on all devices.
       This prevents long text content from looking cramped.
    */
    <ul className="grid grid-cols-1 gap-y-5 pt-4 border-t border-border/40">
        {highlights.map((item, i) => (
            <HighlightItem key={i} {...item} />
        ))}
    </ul>
);

const HighlightItem = ({ icon: Icon = CheckCircle, text }: IHighlight) => (
    <li className="flex items-start gap-4 group">
        <div className="mt-1 bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <Icon className="size-5 shrink-0" />
        </div>
        <span className="text-sm @xl:text-base text-foreground/85 font-medium leading-relaxed pt-0.5">
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