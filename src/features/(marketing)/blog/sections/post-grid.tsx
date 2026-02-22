import { Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function PostGrid({ eyebrow, title, subtitle, posts, showMoreHref }: IPostGrid) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <Grid posts={posts} />
            {showMoreHref && <LoadMore href={showMoreHref} />}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const Grid = ({ posts }: { posts: IPostGrid['posts'] }) => (
    <div className="grid grid-cols-1 @lg:grid-cols-2 @5xl:grid-cols-3 gap-6">
        {posts.map((post, i) => (
            <PostCard key={i} {...post} />
        ))}
    </div>
);

const PostCard = ({ title, excerpt, image, href, category, date, readTime, author }: IPostGrid['posts'][number]) => (
    <Link href={href} className="group block">
        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow py-0 gap-3">
            <CardHeader className="p-0">
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge variant="secondary" className="absolute top-3 left-3 rounded-full">
                        {category}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-3 pb-5">
                <h3 className="font-semibold text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{excerpt}</p>
                <CardMeta author={author} date={date} readTime={readTime} />
            </CardContent>
        </Card>
    </Link>
);

const CardMeta = ({ author, date, readTime }: { author: IPostGrid['posts'][number]['author']; date: string; readTime: string }) => (
    <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center gap-2">
            <Avatar className="size-6">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback className="text-[10px]">{author.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium">{author.name}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                {date}
            </span>
            <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {readTime}
            </span>
        </div>
    </div>
);

const LoadMore = ({ href }: { href: string }) => (
    <div className="flex justify-center mt-10">
        <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
            <Link href={href}>View All Posts</Link>
        </Button>
    </div>
);

// ============= TYPES =============
interface IPostGrid {
    eyebrow: string;
    title: string;
    subtitle: string;
    posts: {
        title: string;
        excerpt: string;
        image: string;
        href: string;
        category: string;
        date: string;
        readTime: string;
        author: {
            name: string;
            avatar: string;
        };
    }[];
    showMoreHref?: string;
}
