"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';
import { Separator } from '@/components/ui/separator';

// ============= MAIN COMPONENT =============
export default function Authors({ eyebrow, title, subtitle, authors }: IAuthors) {
    return (
        <Section cols={4} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {authors.map((author, i) => (
                <AuthorCard key={i} {...author} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const AuthorCard = ({ name, avatar, role, expertise, postCount, readCount, href }: IAuthors['authors'][number]) => (
    <Card className="group gap-3 p-6 pb-5 hover:border-border/60 transition-colors">
        <CardContent className='flex flex-col items-center gap-3'>
            <div className="relative">
                <Avatar className="size-16">
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback className="text-base font-medium bg-blue-50 text-blue-600">
                        {name.slice(0, 2)}
                    </AvatarFallback>
                </Avatar>
            </div>

            <div className="text-center">
                <h3 className="text-[15px] font-medium leading-tight">{name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
            </div>

            <Separator />

            <ExpertiseTags expertise={expertise} />

            <AuthorStats postCount={postCount} readCount={readCount} />
        </CardContent>
        <CardFooter>
            <Button variant="outline" size="sm" className="w-full text-[13px] font-medium" asChild>
                <Link href={href}>
                    View articles
                    <ArrowRight className="ml-1.5 size-3.5 opacity-60" />
                </Link>
            </Button>
        </CardFooter>
    </Card>
);

const ExpertiseTags = ({ expertise }: { expertise: string[] }) => (
    <div className="flex flex-wrap justify-center gap-1.5">
        {expertise.map((tag, i) => (
            <span
                key={i}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50"
            >
                {tag}
            </span>
        ))}
    </div>
);

import { NumberTicker } from '@/components/ui/number-ticker';

const AuthorStats = ({ postCount, readCount }: { postCount: number; readCount: number }) => (
    <div className="flex gap-4">
        <div className="text-center">
            <p className="text-lg font-medium leading-none">
                <NumberTicker value={postCount} className="text-lg" />
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">articles</p>
        </div>
        <div className="text-center">
            <p className="text-lg font-medium leading-none">
                <NumberTicker value={readCount} className="text-lg" />
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">reads</p>
        </div>
    </div>
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
        readCount: number;
        href: string;
    }[];
}
