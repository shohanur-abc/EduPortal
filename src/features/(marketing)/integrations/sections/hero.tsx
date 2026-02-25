import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Hero({ badge, title, highlight, description, searchPlaceholder }: IHero) {
    return (
        <Section className="space-y-8 text-center">
            <BadgeLabel text={badge} />
            <Title text={title} highlight={highlight} />
            <Description text={description} />
            <SearchBar placeholder={searchPlaceholder} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const BadgeLabel = ({ text }: { text: string }) => (
    <div className="flex justify-center">
        <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm font-medium">
            {text}
        </Badge>
    </div>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl @3xl:text-7xl font-bold tracking-tight leading-tight max-w-4xl mx-auto">
        {text}{' '}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
);

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        {text}
    </p>
);

const SearchBar = ({ placeholder }: { placeholder: string }) => (
    <div className="max-w-xl mx-auto w-full relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <Input
            type="text"
            placeholder={placeholder}
            className="h-14 pl-12 pr-4 rounded-full text-base border-2 focus-visible:border-primary"
        />
    </div>
);

// ============= TYPES =============
interface IHero {
    badge: string;
    title: string;
    highlight?: string;
    description: string;
    searchPlaceholder: string;
}
