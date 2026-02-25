import { type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Categories({ eyebrow, title, subtitle, categories }: ICategories) {
    return (
        <Section containerClass="bg-muted/50">
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <FilterList categories={categories} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const FilterList = ({ categories }: { categories: ICategoryItem[] }) => (
    <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category, i) => (
            <CategoryBadge key={i} {...category} />
        ))}
    </div>
);

const CategoryBadge = ({ icon: Icon, label, count }: ICategoryItem) => (
    <Badge
        variant="outline"
        className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors gap-2"
    >
        <Icon className="size-4" />
        {label}
        {count !== undefined && (
            <span className="ml-1 text-xs text-muted-foreground">({count})</span>
        )}
    </Badge>
);

// ============= TYPES =============
interface ICategoryItem {
    icon: LucideIcon;
    label: string;
    count?: number;
}

interface ICategories {
    eyebrow: string;
    title: string;
    subtitle: string;
    categories: ICategoryItem[];
}
