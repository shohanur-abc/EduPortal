"use client"
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Section } from '@/components/section';
import Heading from '@/components/heading';

// ============= MAIN COMPONENT =============
export default function FAQHero({ eyebrow, title, subtitle, searchPlaceholder, onSearch }: IFAQHero) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <SearchBar placeholder={searchPlaceholder} onSearch={onSearch} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const SearchBar = ({ placeholder, onSearch }: { placeholder: string; onSearch?: (query: string) => void }) => (
    <div className="max-w-xl mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
            type="search"
            placeholder={placeholder}
            className="pl-10 h-12 text-base"
            onChange={(e) => onSearch?.(e.target.value)}
        />
    </div>
);

// ============= TYPES =============
interface IFAQHero {
    eyebrow: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    onSearch?: (query: string) => void;
}
