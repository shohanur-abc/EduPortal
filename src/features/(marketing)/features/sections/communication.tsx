import { type LucideIcon, CheckCircle } from '@/lib/icon';
import Image from 'next/image';
import { Badge } from "@/components/molecules";
import { Section } from '@/components/section';
import { cn } from '@/lib/utils'; // Standard shadcn utility

// ============= MAIN COMPONENT =============
export default function Communication({ eyebrow, title, description, image, highlights, direction = 'ltr' }: IFeatureDetail) {
    return (
        /* Added @container for container-based responsiveness and overflow-hidden for clean edges */
        <Section className="px-4 py-16 md:py-24 @container overflow-hidden">
            <div className={cn(
                "max-w-7xl mx-auto grid grid-cols-1 gap-12 @3xl:gap-20 items-center",
                "@4xl:grid-cols-2", // Switches to side-by-side layout on desktop widths
                direction === 'rtl' ? "@4xl:[&>*:first-child]:order-last" : ""
            )}>
                {/* Image Block with hover effects */}
                <ImageBlock src={image.src} alt={image.alt} />

                {/* Content Block with refined typography */}
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
        {/* Subtle decorative glow effect for a premium feel */}
        <div className="absolute -inset-6 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative aspect-[4/3] @3xl:aspect-square w-full rounded-[2.5rem] overflow-hidden border border-border/50 bg-muted shadow-2xl">
            <Image
                src={src || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"} // Reliable communication-themed placeholder
                alt={alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
            />
            {/* Soft inner ring for image definition */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2.5rem]" />
        </div>
    </div>
);

const ContentBlock = ({ eyebrow, title, description, highlights }: Omit<IFeatureDetail, 'image' | 'direction'>) => (
    <div className="flex flex-col justify-center space-y-6 @3xl:space-y-8">
        <div className="space-y-4">
            <Badge variant="outline" className="w-fit rounded-full px-4 py-1.5 text-[10px] @xs:text-xs font-bold uppercase tracking-widest bg-primary/5 border-primary/20 text-primary">
                {eyebrow}
            </Badge>
            <h2 className="text-3xl @2xl:text-4xl @5xl:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
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
    /* Single column grid for better readability of detailed communication points */
    <ul className="grid grid-cols-1 gap-y-5 pt-6 border-t border-border/40">
        {highlights.map((item, i) => (
            <HighlightItem key={i} {...item} />
        ))}
    </ul>
);

const HighlightItem = ({ icon: Icon = CheckCircle, text }: IHighlight) => (
    <li className="flex items-start gap-4 group">
        <div className="mt-1 bg-primary/10 p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
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