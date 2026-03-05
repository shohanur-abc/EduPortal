import { Hash } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Topics({ eyebrow, title, subtitle, topics }: ITopics) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <TopicCloud topics={topics} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const TopicCloud = ({ topics }: { topics: ITopics['topics'] }) => (
    <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
        {topics.map((topic, i) => (
            <TopicTag key={i} {...topic} />
        ))}
    </div>
);

const TopicTag = ({ label, count, href, size }: ITopics['topics'][number]) => (
    <Link href={href}>
        <Badge
            variant="outline"
            className={badgeSize(size)}
        >
            <Hash className={iconSize(size)} />
            <span>{label}</span>
            <span className="ml-1.5 text-muted-foreground/60">{count}</span>
        </Badge>
    </Link>
);

// ============= HELPERS =============
const badgeSize = (size: ITopics['topics'][number]['size']) => {
    const sizes = {
        sm: 'px-3 py-1.5 text-xs gap-1 rounded-full cursor-pointer hover:bg-muted transition-colors',
        md: 'px-4 py-2 text-sm gap-1.5 rounded-full cursor-pointer hover:bg-muted transition-colors',
        lg: 'px-5 py-2.5 text-base gap-2 rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors font-medium',
    };
    return sizes[size];
};

const iconSize = (size: ITopics['topics'][number]['size']) => {
    const sizes = {
        sm: 'size-3',
        md: 'size-3.5',
        lg: 'size-4',
    };
    return sizes[size];
};

// ============= TYPES =============
interface ITopics {
    eyebrow: string;
    title: string;
    subtitle: string;
    topics: {
        label: string;
        count: number;
        href: string;
        size: 'sm' | 'md' | 'lg';
    }[];
}
