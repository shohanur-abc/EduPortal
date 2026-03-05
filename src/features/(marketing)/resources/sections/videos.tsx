import { Play } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Videos({ eyebrow, title, subtitle, videos }: IVideos) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <Grid videos={videos} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const Grid = ({ videos }: { videos: IVideoItem[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
        {videos.map((video, i) => (
            <VideoCard key={i} {...video} />
        ))}
    </div>
);

const VideoCard = ({ thumbnail, title, description, duration, category, url }: IVideoItem) => (
    <a href={url} className="group block">
        <Card className="overflow-hidden hover:border-primary/50 hover:shadow-md transition-all">
            <Thumbnail src={thumbnail} alt={title} duration={duration} />
            <CardContent className="space-y-2 pt-4">
                {category && (
                    <Badge variant="secondary" className="text-xs">{category}</Badge>
                )}
                <h3 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {description}
                </p>
            </CardContent>
        </Card>
    </a>
);

const Thumbnail = ({ src, alt, duration }: { src: string; alt: string; duration: string }) => (
    <div className="relative aspect-video bg-muted overflow-hidden">
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <PlayOverlay />
        <DurationBadge duration={duration} />
    </div>
);

const PlayOverlay = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="size-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
            <Play className="size-6 text-primary-foreground ml-0.5" fill="currentColor" />
        </div>
    </div>
);

const DurationBadge = ({ duration }: { duration: string }) => (
    <Badge className="absolute bottom-2 right-2 bg-black/80 text-white hover:bg-black/80 text-xs">
        {duration}
    </Badge>
);

// ============= TYPES =============
interface IVideoItem {
    thumbnail: string;
    title: string;
    description: string;
    duration: string;
    category?: string;
    url: string;
}

interface IVideos {
    eyebrow: string;
    title: string;
    subtitle: string;
    videos: IVideoItem[];
}
