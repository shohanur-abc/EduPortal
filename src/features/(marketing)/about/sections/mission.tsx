import Image from 'next/image';
import { Section } from '@/components/section';
import { Badge } from '@/components/ui/badge';

// ============= MAIN COMPONENT =============
export default function Mission({ eyebrow, title, subtitle, content, image }: IMission) {
    return (
        <Section containerClass="bg-muted/50">
            <div className="grid grid-cols-1 @4xl:grid-cols-2 gap-12 items-center">
                <ContentBlock eyebrow={eyebrow} title={title} subtitle={subtitle} content={content} />
                <ImageBlock src={image.src} alt={image.alt} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ContentBlock = ({ eyebrow, title, subtitle, content }: Pick<IMission, 'eyebrow' | 'title' | 'subtitle' | 'content'>) => (
    <div className="space-y-6">
        <div className="space-y-3">
            <Badge variant='ghost' className="text-sm font-semibold tracking-widest text-primary border-input block mr-auto">{eyebrow}</Badge>
            <h2 className="text-3xl @lg:text-4xl @4xl:text-5xl font-bold tracking-tight text-foreground text-left">{title}</h2>
            <p className="text-base text-muted-foreground @lg:text-lg text-left mx-0">{subtitle}</p>
        </div>
        {content.map((paragraph, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed">{paragraph}</p>
        ))}
    </div>
);

const ImageBlock = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
        <Image src={src} alt={alt} fill className="object-cover" />
    </div>
);

// ============= TYPES =============
interface IMission {
    eyebrow: string;
    title: string;
    subtitle: string;
    content: string[];
    image: { src: string; alt: string };
}
