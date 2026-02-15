---
applyTo: 'src/{features,components}/**/*.tsx'
---
must follow the sequence and structure below.
Component File Structure (Top → Bottom)

example:
```tsx
import { Search, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
// - Only layout controlling (grid, flex, max-w-7xl, gap) classess allowed 
// - No design details, No business logic
// - Props দিয়ে children component গুলোকে responsibility distribute করে দিবে
// - সব children Components এখানেই merged অবস্থায় থাকবে।
// - যেন পুরো component-এর layout overview এখান থেকে বোঝা যাবে
// - এখানে data passing করা হবে না।  data passing করা হবে page.tsx থেকে 
// - Main থেকে Children components এ props drilling করবে কিন্তু children থেকে Grand children components এ props drilling avoid করবে।

export default function Hero({title, description, searchBar, trendingItems}: IHero) {
    return (
        // Section component প্রতিটা section এর children কে wrapped করে রাখবে এভাবে
        <Section className="space-y-8">
            <Title {...title} />
            <Description {...description} />
            <SearchBar {...searchBar}/>
            <TrendingItems items={trendingItems} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
// - Arrow function only
// - Design + UI logic এখানেই থাকবে
// - Props-driven
// - Main component থেকে isolated
const Title = ({ text, highlight }: IHero['title']) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
        {text} {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
);

const Description = ({ text }: IHero['description']) => (
    <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
        {text}
    </p>
);

const SearchBar = ({ placeholder, suggestions }: IHero['searchBar']) => (
    <div className="relative max-w-xl mx-auto">
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder}
                className="pl-12 pr-4 h-14 text-lg rounded-full border-2"
            />
            <Button
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                size="lg"
            >
                Search
            </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
            {suggestions.map((suggestion, i) => (
                <Badge
                    key={i}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                    asChild
                >
                    <Link href={`/search?q=${suggestion}`}>{suggestion}</Link>
                </Badge>
            ))}
        </div>
    </div>
);


const TrendingItems = ({ items } : { items: IHero['trendingItems']; }) => (
    <div className="mt-12">
        <div className="flex items-center justify-center gap-2 mb-6">
            <TrendingUp className="size-5 text-primary" />
            <span className="font-medium">Trending Searches</span>
        </div>
        <div className="flex justify-center gap-4 flex-wrap">
            {items.map(({ image, title, href }, i) => (
                <Link
                    key={i}
                    href={href}
                    className="group flex items-center gap-3 rounded-full border bg-card px-2 py-2 pr-4 hover:border-primary/50 transition-colors"
                >
                    <div className="relative size-10 rounded-full overflow-hidden">
                        <Image src={image} alt={title} fill className="object-cover" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {title}
                    </span>
                </Link>
            ))}
        </div>
    </div>
);

// =========== HELPERS =============
// - Component-scoped utilities only (neither feature or global scoped)
// - dto, data conversion, object mapping, etc
// - No helpers needed for this component


// ============= VARIANTS =============
// - All conditional styling must use cva, No inline conditional class logic
// - but cva mustn't be used for non-conditional styling (e.g. static "text-sm" or "bg-white" class)
// - এখানে যেহেতু conditional styling নেই তাই এখানে variant বানানো হয়নি। 


// ============= TYPES =============
// - এভাবে types লিখবে এবং এটা সবার শেষে।
interface IHero {
    title: {
        text: string;
        highlight?: string;
    };
    description: {
        text: string;
    };
    searchBar: {
        placeholder: string;
        suggestions: string[];
    };
    trendingItems: {
        image: string;
        title: string;
        href: string;
    }[];
}


// Goal
// - Readability from top to bottom
// - Predictable component structure
// - Clear separation of concerns
// - Consistent patterns for component organization
```