import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function FeaturedPost({ eyebrow, post }: IFeaturedPost) {
    return (
        <Section>
            <SectionLabel text={eyebrow} />
            <FeaturedCard post={post} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const SectionLabel = ({ text }: { text: string }) => (
    <div className="mb-8">
        <Badge variant="ghost" className="text-sm tracking-widest text-primary border-input">
            {text}
        </Badge>
    </div>
);

const FeaturedCard = ({ post }: { post: IFeaturedPost['post'] }) => (
    <Link href={post.href} className="group block">
        <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-8 rounded-2xl border bg-card overflow-hidden hover:shadow-xl transition-shadow">
            <CoverImage src={post.image} alt={post.title} />
            <PostDetails post={post} />
        </div>
    </Link>
);

const CoverImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[16/10] @3xl:aspect-auto overflow-hidden">
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
    </div>
);

const PostDetails = ({ post }: { post: IFeaturedPost['post'] }) => (
    <div className="flex flex-col justify-center gap-4 px-6 py-2 @3xl:p-10">
        <Badge variant="secondary" className="w-fit rounded-full">{post.category}</Badge>
        <h2 className="text-2xl @sm:text-3xl @3xl:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors">
            {post.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
        <PostMeta author={post.author} date={post.date} readTime={post.readTime} />
        <ReadMoreButton />
    </div>
);

const PostMeta = ({ author, date, readTime }: { author: IFeaturedPost['post']['author']; date: string; readTime: string }) => (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
            <Avatar className="size-8">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback className="text-xs">{author.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-foreground">{author.name}</span>
        </div>
        <div className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            <span>{date}</span>
        </div>
        <div className="flex items-center gap-1">
            <Clock className="size-3.5" />
            <span>{readTime}</span>
        </div>
    </div>
);

const ReadMoreButton = () => (
    <div className="pt-2">
        <Button variant="ghost" className="px-0 text-primary group-hover:underline">
            Read Full Article
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
        </Button>
    </div>
);

// ============= TYPES =============
interface IFeaturedPost {
    eyebrow: string;
    post: {
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
    };
}
