import { TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Trending({ eyebrow, title, subtitle, posts }: ITrending) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <TrendingList posts={posts} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const TrendingList = ({ posts }: { posts: ITrending['posts'] }) => (
    <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex-row items-center gap-2 pb-4">
            <TrendingUp className="size-5 text-primary" />
            <span className="font-semibold">Trending This Week</span>
        </CardHeader>
        <CardContent className="space-y-0">
            {posts.map((post, i) => (
                <div key={i}>
                    <TrendingItem post={post} rank={i + 1} />
                    {i < posts.length - 1 && <Separator className="my-4" />}
                </div>
            ))}
        </CardContent>
    </Card>
);

const TrendingItem = ({ post, rank }: { post: ITrending['posts'][number]; rank: number }) => (
    <Link href={post.href} className="group flex items-start gap-4">
        <RankNumber rank={rank} />
        <div className="flex-1 space-y-1.5">
            <Badge variant="secondary" className="rounded-full text-[10px]">{post.category}</Badge>
            <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <Avatar className="size-5">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback className="text-[8px]">{post.author.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span>{post.author.name}</span>
                </div>
                <span>·</span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
            </div>
        </div>
        <ArrowRight className="size-4 text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
    </Link>
);

const RankNumber = ({ rank }: { rank: number }) => (
    <span className="text-3xl font-black text-muted-foreground/20 leading-none min-w-[2.5rem] select-none">
        {String(rank).padStart(2, '0')}
    </span>
);

// ============= TYPES =============
interface ITrending {
    eyebrow: string;
    title: string;
    subtitle: string;
    posts: {
        title: string;
        href: string;
        category: string;
        date: string;
        readTime: string;
        author: {
            name: string;
            avatar: string;
        };
    }[];
}
