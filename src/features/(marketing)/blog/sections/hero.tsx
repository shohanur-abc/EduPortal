import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function BlogHero({ eyebrow, title, description, searchPlaceholder, popularSearches }: IBlogHero) {
    return (
        <Section className="space-y-8">
            <EyebrowBadge text={eyebrow} />
            <Title text={title} />
            <Description text={description} />
            <SearchBar placeholder={searchPlaceholder} />
            <PopularSearches items={popularSearches} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const EyebrowBadge = ({ text }: { text: string }) => (
    <div className="flex justify-center">
        <Badge variant="ghost" className="text-sm tracking-widest text-primary border-input">
            {text}
        </Badge>
    </div>
);

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl @3xl:text-7xl font-bold tracking-tight text-center leading-tight">
        {text}
    </h1>
);

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @sm:text-xl text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
        {text}
    </p>
);

const SearchBar = ({ placeholder }: { placeholder: string }) => (
    <div className="max-w-2xl mx-auto w-full">
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder}
                className="h-14 pl-12 pr-28 rounded-full text-base border-2 focus-visible:border-primary"
            />
            <Button size="lg" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full px-6">
                Search
            </Button>
        </div>
    </div>
);

const PopularSearches = ({ items }: { items: IBlogHero['popularSearches'] }) => (
    <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {items.map((item, i) => (
            <Badge key={i} variant="secondary" className="rounded-full cursor-pointer hover:bg-primary/10 transition-colors">
                {item}
            </Badge>
        ))}
    </div>
);

// ============= TYPES =============
interface IBlogHero {
    eyebrow: string;
    title: string;
    description: string;
    searchPlaceholder: string;
    popularSearches: string[];
}
