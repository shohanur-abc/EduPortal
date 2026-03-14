import { type LucideIcon } from '@/lib/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Certifications({ eyebrow, title, subtitle, certifications }: ICertifications) {
    return (
        <Section cols={4} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {certifications.map((cert, i) => (
                <CertificationCard key={i} {...cert} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const CertificationCard = ({ icon: Icon, name, status, description }: ICertifications['certifications'][0]) => (
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

interface ICertifications {
    eyebrow: string;
    title: string;
    subtitle: string;
    certifications: {
        icon: LucideIcon;
        name: string;
        status: string;
        description: string;
    }[];
}
