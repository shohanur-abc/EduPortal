import Image from 'next/image';
import { Play, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Section } from '@/components/section';
import Heading from '@/components/heading';

// ============= MAIN COMPONENT =============
export default function VideoGuides({ eyebrow, title, subtitle, videos }: IVideoGuides) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <VideosGrid videos={videos} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const VideosGrid = ({ videos }: { videos: IVideoGuides['videos'] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-6">
        {videos.map((video, i) => (
            <VideoCard key={i} {...video} />
        ))}
    </div>
);

const VideoCard = ({ title, description, thumbnailUrl, duration, category, href }: IVideoGuide) => (
    <a href={href} className="group block">
        <Card className="h-full overflow-hidden gap-0 py-0">
            <AspectRatio ratio={16 / 9}>
                <div className="relative size-full bg-muted">
                    {thumbnailUrl && (
                        <Image src={thumbnailUrl} alt={title} fill className="object-cover" />
                    )}
                    <VideoOverlay duration={duration} />
                </div>
            </AspectRatio>
            <CardContent className="space-y-2 pt-4 pb-5">
                {category && <Badge variant="secondary">{category}</Badge>}
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </CardContent>
        </Card>
    </a>
);

const VideoOverlay = ({ duration }: { duration: string }) => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
        <div className="size-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="size-5 text-foreground ml-0.5" />
        </div>
        <span className="absolute bottom-2 right-2 text-xs text-white bg-black/70 rounded px-1.5 py-0.5 flex items-center gap-1">
            <Clock className="size-3" />
            {duration}
        </span>
    </div>
);

// ============= TYPES =============
interface IVideoGuide {
    title: string;
    description: string;
    thumbnailUrl?: string;
    duration: string;
    category?: string;
    href: string;
}

interface IVideoGuides {
    eyebrow: string;
    title: string;
    subtitle: string;
    videos: IVideoGuide[];
}
