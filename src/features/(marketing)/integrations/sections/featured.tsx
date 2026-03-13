import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Featured({ eyebrow, title, subtitle, integrations }: IFeatured) {
    return (
        <Section cols={3} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {integrations.map((integration, i) => (
                <FeaturedCard key={i} {...integration} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const FeaturedCard = ({ logo, name, category, description, highlights, href, ctaLabel }: IFeaturedItem) => (
    <Card className="group hover:border-primary/50 hover:shadow-lg transition-all">
        <CardHeader className="space-y-4">
            <div className="flex items-center gap-4">
                <LogoBox logo={logo} name={name} />
                <div>
                    <CardTitle className="text-lg">{name}</CardTitle>
                    <Badge variant="secondary" className="mt-1 text-xs">{category}</Badge>
                </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            <HighlightList highlights={highlights} />
            {href && (
                <Button variant="ghost" size="sm" className="px-0 text-primary" asChild>
                    <Link href={href}>
                        {ctaLabel ?? 'Learn more'}
                        <ArrowRight className="ml-1 size-4" />
                    </Link>
                </Button>
            )}
        </CardContent>
    </Card>
);

const LogoBox = ({ logo, name }: { logo: string; name: string }) => (
    <div className="size-14 rounded-xl border bg-muted/50 flex items-center justify-center shrink-0 overflow-hidden relative">
        <Image src={logo} alt={name} fill className="object-contain rounded-full p-2" sizes="56px" />
    </div>
);

const HighlightList = ({ highlights }: { highlights: string[] }) => (
    <ul className="space-y-2">
        {highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                {item}
            </li>
        ))}
    </ul>
);

// ============= TYPES =============
interface IFeaturedItem {
    logo: string;
    name: string;
    category: string;
    description: string;
    highlights: string[];
    href?: string;
    ctaLabel?: string;
}

interface IFeatured {
    eyebrow: string;
    title: string;
    subtitle: string;
    integrations: IFeaturedItem[];
}
