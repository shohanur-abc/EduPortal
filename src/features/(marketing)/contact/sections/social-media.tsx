import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function SocialMedia({ eyebrow, title, subtitle, platforms }: ISocialMedia) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <PlatformsRow platforms={platforms} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const PlatformsRow = ({ platforms }: { platforms: ISocialPlatform[] }) => (
    <div className="flex flex-wrap items-center justify-center gap-4">
        {platforms.map((platform, i) => (
            <PlatformLink key={i} {...platform} />
        ))}
    </div>
);

const PlatformLink = ({ icon: Icon, name, href, handle }: ISocialPlatform) => (
    <Button variant="outline" size="lg" asChild>
        <a href={href} target="_blank" rel="noopener noreferrer" className="gap-2">
            <Icon className="size-5" />
            <span className="flex flex-col items-start leading-tight">
                <span className="text-sm font-medium">{name}</span>
                {handle && <span className="text-xs text-muted-foreground">{handle}</span>}
            </span>
        </a>
    </Button>
);

// ============= TYPES =============
interface ISocialMedia {
    eyebrow: string;
    title: string;
    subtitle: string;
    platforms: ISocialPlatform[];
}

interface ISocialPlatform {
    icon: LucideIcon;
    name: string;
    href: string;
    handle?: string;
}
