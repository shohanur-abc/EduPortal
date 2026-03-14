import { type LucideIcon } from '@/lib/icon';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Categories({ eyebrow, title, subtitle, categories, activeCategory }: ICategories) {
    return (
        <Section className="flex flex-wrap items-center justify-center gap-3" eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {categories.map((category, i) => (
                <CategoryBadge key={i} {...category} isActive={category.label === activeCategory} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const CategoryBadge = ({ icon: Icon, label, count, isActive }: ICategories['categories'][number] & { isActive: boolean }) => (
    <button type="button" className="group">
        <Badge
            variant={isActive ? 'default' : 'outline'}
            className="cursor-pointer rounded-full px-5 py-2.5 text-sm gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
            <Icon className="size-4" />
            <span>{label}</span>
            <span className="ml-1 rounded-full bg-background/20 px-2 py-0.5 text-xs font-semibold">
                {count}
            </span>
        </Badge>
    </button>
);



// ============= TYPES =============
interface ICategories {
    eyebrow: string;
    title: string;
    subtitle: string;
    activeCategory?: string;
    categories: {
        icon: LucideIcon;
        label: string;
        count: number;
    }[];
}
