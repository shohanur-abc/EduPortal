import { type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Categories({ eyebrow, title, subtitle, categories }: ICategories) {
    return (
        <Section eyebrow={eyebrow} title={title} subtitle={subtitle} className='flex flex-wrap justify-center gap-3' containerClass="relative" decorative={<div className='inset-0 absolute bg-muted/50 -z-1 blur-2xl bg-linear-to-r from-primary/5 to-secondary/10'></div>}>
            {categories.map((category, i) => (
                <CategoryBadge key={i} {...category} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const CategoryBadge = ({ icon: Icon, label, count }: ICategories['categories'][number]) => (
    <Badge
        variant="outline"
        className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors gap-2"
    >
        <Icon className="size-4" />
        {label}
        {count !== undefined && (
            <span className="ml-1 text-xs text-muted-foreground">({count})</span>
        )}
    </Badge>
);

// ============= TYPES =============
interface ICategories {
    eyebrow: string;
    title: string;
    subtitle: string;
    categories: {
        icon: LucideIcon;
        label: string;
        count?: number;
    }[];
}
