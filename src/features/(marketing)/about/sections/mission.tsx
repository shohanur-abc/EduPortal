import Image from 'next/image';
import { Section } from '@/components/section';
import Heading from '@/components/heading';

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
        <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} align="left" className="mb-0" />
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
