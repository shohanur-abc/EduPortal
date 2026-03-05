import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Infrastructure({ eyebrow, title, subtitle, layers }: IInfrastructure) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <LayerList layers={layers} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const LayerList = ({ layers }: { layers: IInfrastructureLayer[] }) => (
    <div className="grid grid-cols-1 @lg:grid-cols-3 gap-8">
        {layers.map((layer, i) => (
            <LayerCard key={i} {...layer} />
        ))}
    </div>
);

const LayerCard = ({ icon: Icon, title, description, tag, details }: IInfrastructureLayer) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all">
        <CardHeader>
            <div className="flex items-center justify-between">
                <IconBox icon={Icon} />
                {tag && <Badge variant="outline" className="text-xs">{tag}</Badge>}
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <DetailList details={details} />
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="size-6 text-primary" />
    </div>
);

const DetailList = ({ details }: { details: string[] }) => (
    <ul className="space-y-2">
        {details.map((detail, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                {detail}
            </li>
        ))}
    </ul>
);

// ============= TYPES =============
interface IInfrastructureLayer {
    icon: LucideIcon;
    title: string;
    description: string;
    tag?: string;
    details: string[];
}

interface IInfrastructure {
    eyebrow: string;
    title: string;
    subtitle: string;
    layers: IInfrastructureLayer[];
}
