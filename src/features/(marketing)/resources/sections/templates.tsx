import { Download, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Templates({ eyebrow, title, subtitle, templates }: ITemplates) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <Grid templates={templates} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const Grid = ({ templates }: { templates: ITemplateItem[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4 gap-6">
        {templates.map((template, i) => (
            <TemplateCard key={i} {...template} />
        ))}
    </div>
);

const TemplateCard = ({ icon: Icon, title, description, format, category, downloadUrl }: ITemplateItem) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all flex flex-col">
        <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">{category}</Badge>
                <FormatBadge format={format} />
            </div>
            <IconBox icon={Icon} />
            <CardTitle className="text-lg leading-snug">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
        <CardFooter>
            <Button variant="outline" className="w-full gap-2" asChild>
                <a href={downloadUrl} download>
                    <Download className="size-4" />
                    Download {format.toUpperCase()}
                </a>
            </Button>
        </CardFooter>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="size-6 text-primary" />
    </div>
);

const FormatBadge = ({ format }: { format: string }) => (
    <Badge variant="secondary" className="text-xs uppercase">
        {format}
    </Badge>
);

// ============= TYPES =============
interface ITemplateItem {
    icon: LucideIcon;
    title: string;
    description: string;
    format: string;
    category: string;
    downloadUrl: string;
}

interface ITemplates {
    eyebrow: string;
    title: string;
    subtitle: string;
    templates: ITemplateItem[];
}
