import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Certifications({ eyebrow, title, subtitle, certifications }: ICertifications) {
    return (
        <Section eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <Grid certifications={certifications} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const Grid = ({ certifications }: { certifications: ICertificationItem[] }) => (
    <div className="grid grid-cols-1 @lg:grid-cols-2 @3xl:grid-cols-4 gap-6">
        {certifications.map((cert, i) => (
            <CertificationCard key={i} {...cert} />
        ))}
    </div>
);

const CertificationCard = ({ icon: Icon, name, status, description }: ICertificationItem) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all text-center">
        <CardHeader className="items-center">
            <IconBox icon={Icon} />
            <CardTitle className="text-lg">{name}</CardTitle>
            <StatusBadge status={status} />
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors mx-auto mt-1">
        <Icon className="size-7 text-primary" />
    </div>
);

const StatusBadge = ({ status }: { status: string }) => (
    <Badge variant="secondary" className="text-xs mx-auto mt-1">
        {status}
    </Badge>
);

// ============= TYPES =============
interface ICertificationItem {
    icon: LucideIcon;
    name: string;
    status: string;
    description: string;
}

interface ICertifications {
    eyebrow: string;
    title: string;
    subtitle: string;
    certifications: ICertificationItem[];
}
