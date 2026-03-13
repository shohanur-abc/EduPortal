import Image from 'next/image';
import { Section } from '@/components/section';
import { Badge } from '@/components/ui/badge';

// ============= MAIN COMPONENT =============
export default function Story({ eyebrow, title, subtitle, paragraphs, image }: IStory) {
    return (
        <Section className="grid grid-cols-1 @4xl:grid-cols-2 gap-12 items-center" containerClass="bg-muted/50">
            <ImageBlock src={image.src} alt={image.alt} />
            <ContentBlock eyebrow={eyebrow} title={title} subtitle={subtitle} paragraphs={paragraphs} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ImageBlock = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
        <Image src={src} alt={alt} fill className="object-cover" />
    </div>
);

const ContentBlock = ({ eyebrow, title, subtitle, paragraphs }: Pick<IStory, 'eyebrow' | 'title' | 'subtitle' | 'paragraphs'>) => (
    <div className="space-y-6">
        <div className="space-y-3">
            <Badge variant='ghost' className="text-sm font-semibold tracking-widest text-primary border-input block mr-auto">{eyebrow}</Badge>
            <h2 className="text-3xl @lg:text-4xl @4xl:text-5xl font-bold tracking-tight text-foreground text-left">{title}</h2>
            <p className="text-base text-muted-foreground @lg:text-lg text-left mx-0">{subtitle}</p>
        </div>
        {paragraphs.map((text, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed">{text}</p>
        ))}
    </div>
);

// ============= TYPES =============
interface IStory {
    eyebrow: string;
    title: string;
    subtitle: string;
    paragraphs: string[];
    image: { src: string; alt: string };
}
