import { ArrowRight, Download, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Resources({ eyebrow, title, subtitle, resources }: IResources) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <ResourcesGrid resources={resources} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ResourcesGrid = ({ resources }: { resources: IResources['resources'] }) => (
    <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-6 @4xl:grid-cols-3">
        {resources.map((resource, i) => (
            <ResourceCard key={i} {...resource} />
        ))}
    </div>
);

const ResourceCard = ({ icon: Icon, title, description, type, href, downloadable }: IResources['resources'][number]) => (
    <Card className="group hover:shadow-lg transition-shadow">
        <CardContent className="space-y-4">
            <div className="flex items-start justify-between">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="size-6 text-primary" />
                </div>
                <Badge variant="secondary" className="rounded-full">{type}</Badge>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{description}</p>
            </div>
            <ResourceAction href={href} downloadable={downloadable} />
        </CardContent>
    </Card>
);

const ResourceAction = ({ href, downloadable }: { href: string; downloadable?: boolean }) => (
    <Button variant="ghost" size="sm" className="px-0 text-primary" asChild>
        <Link href={href}>
            {downloadable ? (
                <>
                    <Download className="mr-1.5 size-3.5" />
                    Download Resource
                </>
            ) : (
                <>
                    Read More
                    <ArrowRight className="ml-1.5 size-3.5" />
                </>
            )}
        </Link>
    </Button>
);

// ============= TYPES =============
interface IResources {
    eyebrow: string;
    title: string;
    subtitle: string;
    resources: {
        icon: LucideIcon;
        title: string;
        description: string;
        type: string;
        href: string;
        downloadable?: boolean;
    }[];
}
