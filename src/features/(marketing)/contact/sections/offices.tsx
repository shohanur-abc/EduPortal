import type { LucideIcon } from '@/lib/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Offices({ eyebrow, title, subtitle, offices }: IOffices) {
    return (
        <Section cols={3} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {offices.map((office, i) => (
                <OfficeCard key={i} {...office} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const OfficeCard = ({ icon: Icon, city, country, address, phone, email, isHQ, mapPlaceholder }: IOffices['offices'][0]) => (
    <Card className='pt-0'>
        <div className="aspect-video bg-muted rounded-t-xl flex items-center justify-center">
            {mapPlaceholder ? (
                <span className="text-sm text-muted-foreground">{mapPlaceholder}</span>
            ) : (
                <span className="text-sm text-muted-foreground">Map preview</span>
            )}
        </div>
        <CardHeader>
            <div className="flex items-center gap-2">
                <Icon className="size-5 text-primary" />
                <CardTitle>{city}</CardTitle>
                {isHQ && <Badge variant="default">HQ</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{country}</p>
        </CardHeader>
        <CardContent className="space-y-2">
            <DetailRow label="Address" value={address} />
            {phone && <DetailRow label="Phone" value={phone} />}
            {email && <DetailRow label="Email" value={email} />}
        </CardContent>
    </Card>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm text-foreground">{value}</span>
    </div>
);

// ============= TYPES =============
interface IOffices {
    eyebrow: string;
    title: string;
    subtitle: string;
    offices: {
        icon: LucideIcon;
        city: string;
        country: string;
        address: string;
        phone?: string;
        email?: string;
        isHQ?: boolean;
        mapPlaceholder?: string;
    }[];
}

