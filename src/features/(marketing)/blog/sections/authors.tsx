"use client";

import { ArrowRight } from '@/lib/icon';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button, AvatarMolecule } from "@/components/molecules";
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
                <AvatarMolecule src={avatar} alt={name} fallback={name.slice(0, 2)} className="size-16" classNames={{ fallback: "text-base font-medium bg-blue-50 text-blue-600" }} />
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
            <Button variant="outline" size="sm" className="w-full text-[13px] font-medium" href={href} rightIcon={<ArrowRight className="size-3.5 opacity-60" />}>
View articles
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
