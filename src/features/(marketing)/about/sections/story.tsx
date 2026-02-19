import Image from 'next/image';
import { Section } from '@/components/section';
import Heading from '@/components/heading';

// ============= MAIN COMPONENT =============
export default function Story({ eyebrow, title, subtitle, paragraphs, image }: IStory) {
    return (
        <Section containerClass="bg-muted/50">
            <div className="grid grid-cols-1 @4xl:grid-cols-2 gap-12 items-center">
                <ImageBlock src={image.src} alt={image.alt} />
                <ContentBlock eyebrow={eyebrow} title={title} subtitle={subtitle} paragraphs={paragraphs} />
            </div>
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
        <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} align="left" className="mb-0" />
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
