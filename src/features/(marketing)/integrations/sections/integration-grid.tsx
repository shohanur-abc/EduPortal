import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function IntegrationGrid({ eyebrow, title, subtitle, integrations }: IIntegrationGrid) {
    return (
        <Section eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <Grid integrations={integrations} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const Grid = ({ integrations }: { integrations: IIntegrationItem[] }) => (
    <div className="grid grid-cols-1 @xl:grid-cols-2 @5xl:grid-cols-4 gap-6">
        {integrations.map((integration, i) => (
            <IntegrationCard key={i} {...integration} />
        ))}
    </div>
);

const IntegrationCard = ({ logo, name, category, description, connectLabel }: IIntegrationItem) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all">
        <CardHeader className="flex-row items-center gap-4 space-y-0">
            <LogoBox logo={logo} name={name} />
            <div className="flex-1 min-w-0">
                <CardTitle className="text-base">{name}</CardTitle>
                <Badge variant="outline" className="mt-1 text-xs">{category}</Badge>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            <Button size="sm" variant="outline" className="w-full rounded-full">
                {connectLabel}
            </Button>
        </CardContent>
    </Card>
);

const LogoBox = ({ logo, name }: { logo: string; name: string }) => (
    <div className="size-14 rounded-lg border bg-muted/50 flex items-center justify-center shrink-0 overflow-hidden relative">
        <Image src={logo} alt={name} fill className="object-contain rounded-full p-2" sizes="48px" />
    </div>
);

// ============= TYPES =============
interface IIntegrationItem {
    logo: string;
    name: string;
    category: string;
    description: string;
    connectLabel: string;
}

interface IIntegrationGrid {
    eyebrow: string;
    title: string;
    subtitle: string;
    integrations: IIntegrationItem[];
}
