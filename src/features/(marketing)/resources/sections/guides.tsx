import { Download, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Guides({ eyebrow, title, subtitle, guides }: IGuides) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <Grid guides={guides} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const Grid = ({ guides }: { guides: IGuideItem[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
        {guides.map((guide, i) => (
            <GuideCard key={i} {...guide} />
        ))}
    </div>
);

const GuideCard = ({ type, title, description, pages, downloadUrl }: IGuideItem) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all flex flex-col">
        <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
                <TypeBadge type={type} />
                {pages && <span className="text-xs text-muted-foreground">{pages} pages</span>}
            </div>
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FileText className="size-6 text-primary" />
            </div>
            <CardTitle className="text-lg leading-snug">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
        <CardFooter>
            <Button variant="outline" className="w-full gap-2" asChild>
                <a href={downloadUrl} download>
                    <Download className="size-4" />
                    Download
                </a>
            </Button>
        </CardFooter>
    </Card>
);

const TypeBadge = ({ type }: { type: IGuideItem['type'] }) => (
    <Badge variant={typeBadgeVariant(type)} className="text-xs">
        {type}
    </Badge>
);

// ============= HELPERS =============
const typeBadgeVariant = (type: IGuideItem['type']) => {
    const map: Record<IGuideItem['type'], 'default' | 'secondary' | 'outline'> = {
        guide: 'default',
        whitepaper: 'secondary',
        ebook: 'outline',
    };
    return map[type];
};

// ============= TYPES =============
interface IGuideItem {
    type: 'guide' | 'whitepaper' | 'ebook';
    title: string;
    description: string;
    pages?: number;
    downloadUrl: string;
}

interface IGuides {
    eyebrow: string;
    title: string;
    subtitle: string;
    guides: IGuideItem[];
}
