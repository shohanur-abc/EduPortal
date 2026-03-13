import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function FAQCategories({ eyebrow, title, subtitle, categories }: IFAQCategories) {
    return (
        <Section cols={3} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {categories.map((category, i) => (
                <CategoryCard key={i} {...category} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const CategoryCard = ({ icon: Icon, label, description, anchor, count }: IFAQCategory) => (
    <a href={anchor} className="group block">
        <Card className="h-full transition-colors hover:border-primary/50 hover:shadow-md">
            <CardContent className="flex flex-col items-center text-center gap-3">
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                {count !== undefined && (
                    <span className="text-xs text-muted-foreground">{count} questions</span>
                )}
            </CardContent>
        </Card>
    </a>
);

// ============= TYPES =============
interface IFAQCategory {
    icon: LucideIcon;
    label: string;
    description: string;
    anchor: string;
    count?: number;
}

interface IFAQCategories {
    eyebrow: string;
    title: string;
    subtitle: string;
    categories: IFAQCategory[];
}
