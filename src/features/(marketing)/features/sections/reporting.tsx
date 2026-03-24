import { type LucideIcon, CheckCircle } from '@/lib/icon';
import Image from 'next/image';
import { Badge } from "@/components/molecules";
import { Section } from '@/components/section';
import { cn } from '@/lib/utils'; // Standard shadcn utility for class merging

// ============= MAIN COMPONENT =============
export default function Reporting({ eyebrow, title, description, image, highlights, direction = 'rtl' }: IFeatureDetail) {
    return (
        /* Using @container for precise layout control and py-24 for better vertical breathing room */
        <Section className="px-4 py-16 md:py-24 @container overflow-hidden">
            <div className={cn(
                "max-w-7xl mx-auto grid grid-cols-1 gap-12 @3xl:gap-20 items-center",
                "@4xl:grid-cols-2", // Switches to side-by-side layout on desktop widths
                direction === 'rtl' ? "@4xl:[&>*:first-child]:order-last" : ""
            )}>
                {/* Visual Image Block */}
                <ImageBlock src={image.src} alt={image.alt} />

                {/* Text Content Block */}
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
        {/* Soft glow background for a modern analytics feel */}
        <div className="absolute -inset-6 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative aspect-[4/3] @3xl:aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-border/50 bg-muted shadow-2xl">
            <Image
                src={src || "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=1200"}
                alt={alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 700px"
            />
            {/* Subtle inner shadow overlay */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem]" />
        </div>
    </div>
);

const ContentBlock = ({ eyebrow, title, description, highlights }: Omit<IFeatureDetail, 'image' | 'direction'>) => (
    <div className="flex flex-col justify-center space-y-6 @3xl:space-y-8">
        <div className="space-y-4">
            <Badge variant="outline" className="w-fit rounded-full px-4 py-1.5 text-[10px] @xs:text-xs font-bold uppercase tracking-widest bg-primary/5 border-primary/20 text-primary">
                {eyebrow}
            </Badge>
            <h2 className="text-3xl @2xl:text-4xl @5xl:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
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
    /* Single column list to properly display detailed data-driven insights */
    <ul className="grid grid-cols-1 gap-y-5 pt-6 border-t border-border/40">
        {highlights.map((item, i) => (
            <HighlightItem key={i} {...item} />
        ))}
    </ul>
);

const HighlightItem = ({ icon: Icon = CheckCircle, text }: IHighlight) => (
    <li className="flex items-start gap-4 group">
        <div className="mt-1 bg-primary/10 p-2 rounded-xl group-hover:bg-secondary group-hover:text-accent-foreground transition-all duration-300">
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