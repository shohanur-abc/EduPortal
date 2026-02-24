import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function ContactInfo({ eyebrow, title, subtitle, channels }: IContactInfo) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <ChannelsGrid channels={channels} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ChannelsGrid = ({ channels }: { channels: IContactInfoChannel[] }) => (
    <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-6">
        {channels.map((channel, i) => (
            <ChannelCard key={i} {...channel} />
        ))}
    </div>
);

const ChannelCard = ({ icon: Icon, label, value, description, href }: IContactInfoChannel) => (
    <Card className="text-center">
        <CardContent className="pt-6 space-y-3">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Icon className="size-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{label}</h3>
            {href ? (
                <a href={href} className="text-sm font-medium text-primary hover:underline block">
                    {value}
                </a>
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
    channels: IContactInfoChannel[];
}

interface IContactInfoChannel {
    icon: LucideIcon;
    label: string;
    value: string;
    description?: string;
    href?: string;
}
