import { Play } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';
import Link from 'next/link';

// ============= MAIN COMPONENT =============
export default function Videos({ eyebrow, title, subtitle, videos }: IVideos) {
    return (
        <Section cols={3} className='' eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {videos.map((video, i) => (
                <VideoCard key={i} {...video} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const VideoCard = ({ thumbnail, title, description, duration, category, url }: IVideos['videos'][0]) => (
    <Card className="relative overflow-hidden group hover:border-primary/50 hover:shadow-md transition-all pt-0 gap-0">
        <Link href={url} target='_blank' className='absolute inset-0 z-2' />
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

interface IVideos {
    eyebrow: string;
    title: string;
    subtitle: string;
    videos: {
        thumbnail: string;
        title: string;
        description: string;
        duration: string;
        category?: string;
        url: string;
    }[];
}
