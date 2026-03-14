import type { LucideIcon } from '@/lib/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';
import Link from 'next/link';

// ============= MAIN COMPONENT =============
export default function ContactInfo({ eyebrow, title, subtitle, channels }: IContactInfo) {
    return (
        <Section cols={3} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {channels.map((channel, i) => (
                <ChannelCard key={i} {...channel} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ChannelCard = ({ icon: Icon, label, value, description, href }: IContactInfo['channels'][0]) => (
    <Card className="text-center">
        <CardContent className="space-y-3">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Icon className="size-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{label}</h3>
            {href ? (
                <Link href={href} className="text-sm font-medium text-primary hover:underline block">
                    {value}
                </Link>
            ) : (
                <p className="text-sm font-medium text-foreground">{value}</p>
            )}
            {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
            )}
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IContactInfo {
    eyebrow: string;
    title: string;
    subtitle: string;
    channels: {
        icon: LucideIcon;
        label: string;
        value: string;
        description?: string;
        href?: string;
    }[];
}

