import Image from 'next/image';
import { Button, Badge } from "@/components/molecules";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function IntegrationGrid({ eyebrow, title, subtitle, integrations }: IIntegrationGrid) {
    return (
        <Section cols={4} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {integrations.map((integration, i) => (
                <IntegrationCard key={i} {...integration} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const IntegrationCard = ({ logo, name, category, description, connectLabel }: IIntegrationGrid['integrations'][0]) => (
    <Card className="relative group hover:border-primary/50 hover:shadow-md transition-all gap-2">
        <Badge variant="outline" className="mt-1 text-xs absolute top-1 right-1">{category}</Badge>
        <CardHeader className="flex items-center gap-1 space-y-0">
            <LogoBox logo={logo} name={name} />
            <CardTitle className="text-base">{name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 ">
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            <Button size="sm" variant="outline" className="w-full rounded-full">
                {connectLabel}
            </Button>
        </CardContent>
    </Card>
);

const LogoBox = ({ logo, name }: { logo: string; name: string }) => (
    <div className="size-12 rounded-lg flex items-center justify-center shrink-0 overflow-hidden relative">
        <Image src={logo} alt={name} fill className="object-contain rounded-full p-2" sizes="48px" />
    </div>
);

// ============= TYPES =============
interface IIntegrationGrid {
    eyebrow: string;
    title: string;
    subtitle: string;
    integrations: {
        logo: string;
        name: string;
        category: string;
        description: string;
        connectLabel: string;
    }[];
}
