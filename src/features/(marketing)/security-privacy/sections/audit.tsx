import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Audit({ eyebrow, title, subtitle, features }: IAudit) {
    return (
        <Section cols={3} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {features.map((feature, i) => (
                <AuditCard key={i} {...feature} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const AuditCard = ({ icon: Icon, title, description, tag, capabilities }: IAudit['features'][0]) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all">
        <CardHeader>
            <div className="flex items-center justify-between">
                <IconBox icon={Icon} />
                {tag && <Badge variant="outline" className="text-xs">{tag}</Badge>}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <CapabilityList capabilities={capabilities} />
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="size-6 text-primary" />
    </div>
);

const CapabilityList = ({ capabilities }: { capabilities: string[] }) => (
    <ul className="space-y-2">
        {capabilities.map((capability, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                {capability}
            </li>
        ))}
    </ul>
);

// ============= TYPES =============

interface IAudit {
    eyebrow: string;
    title: string;
    subtitle: string;
    features: {
        icon: LucideIcon;
        title: string;
        description: string;
        tag?: string;
        capabilities: string[];
    }[];
}
