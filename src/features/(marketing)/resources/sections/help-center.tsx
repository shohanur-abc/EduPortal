import { ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function HelpCenter({ eyebrow, title, subtitle, categories }: IHelpCenter) {
    return (
        <Section cols={3} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {categories.map((category, i) => (
                <CategoryCard key={i} {...category} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const CategoryCard = ({ icon: Icon, title, description, articleCount, href }: IHelpCategory) => (
    <Link href={href} className="group block">
        <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all">
            <CardHeader className="space-y-3">
                <IconBox icon={Icon} />
                <CardTitle className="text-lg flex items-center gap-2">
                    {title}
                    <ArrowRight className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                {articleCount !== undefined && (
                    <p className="text-xs font-medium text-primary">{articleCount} articles</p>
                )}
            </CardContent>
        </Card>
    </Link>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="size-6 text-primary" />
    </div>
);

// ============= TYPES =============
interface IHelpCategory {
    icon: LucideIcon;
    title: string;
    description: string;
    articleCount?: number;
    href: string;
}

interface IHelpCenter {
    eyebrow: string;
    title: string;
    subtitle: string;
    categories: IHelpCategory[];
}
