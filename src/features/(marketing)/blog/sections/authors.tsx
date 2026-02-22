import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Authors({ eyebrow, title, subtitle, authors }: IAuthors) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <AuthorsGrid authors={authors} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const AuthorsGrid = ({ authors }: { authors: IAuthors['authors'] }) => (
    <div className="grid grid-cols-1 @lg:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4 gap-6">
        {authors.map((author, i) => (
            <AuthorCard key={i} {...author} />
        ))}
    </div>
);

const AuthorCard = ({ name, avatar, role, expertise, postCount, href }: IAuthors['authors'][number]) => (
    <Card className="group text-center hover:shadow-lg transition-shadow">
        <CardContent className="pt-8 space-y-4">
            <Avatar className="size-20 mx-auto ring-4 ring-background group-hover:ring-primary/20 transition-all">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="text-xl">{name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="font-semibold">{name}</h3>
                <p className="text-sm text-muted-foreground">{role}</p>
            </div>
            <ExpertiseTags expertise={expertise} />
            <PostCounter count={postCount} />
            <Button variant="ghost" size="sm" className="text-primary" asChild>
                <Link href={href}>
                    View Articles
                    <ArrowRight className="ml-1.5 size-3.5" />
                </Link>
            </Button>
        </CardContent>
    </Card>
);

const ExpertiseTags = ({ expertise }: { expertise: string[] }) => (
    <div className="flex flex-wrap justify-center gap-1.5">
        {expertise.map((tag, i) => (
            <Badge key={i} variant="secondary" className="rounded-full text-[10px] px-2">
                {tag}
            </Badge>
        ))}
    </div>
);

const PostCounter = ({ count }: { count: number }) => (
    <p className="text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">{count}</span> articles published
    </p>
);

// ============= TYPES =============
interface IAuthors {
    eyebrow: string;
    title: string;
    subtitle: string;
    authors: {
        name: string;
        avatar: string;
        role: string;
        expertise: string[];
        postCount: number;
        href: string;
    }[];
}
