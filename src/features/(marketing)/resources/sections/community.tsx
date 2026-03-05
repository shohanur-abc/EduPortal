import { ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Community({ eyebrow, title, subtitle, stats, channels, cta }: ICommunity) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <Stats stats={stats} />
            <ChannelGrid channels={channels} />
            {cta && <CTABlock cta={cta} />}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const Stats = ({ stats }: { stats: IStatItem[] }) => (
    <div className="grid grid-cols-2 @lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
        ))}
    </div>
);

const StatCard = ({ value, label }: IStatItem) => (
    <div className="text-center space-y-1">
        <p className="text-3xl @sm:text-4xl font-bold text-primary">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
    </div>
);

const ChannelGrid = ({ channels }: { channels: IChannelItem[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
        {channels.map((channel, i) => (
            <ChannelCard key={i} {...channel} />
        ))}
    </div>
);

const ChannelCard = ({ icon: Icon, title, description, memberCount, href }: IChannelItem) => (
    <Link href={href} className="group block">
        <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all">
            <CardHeader className="space-y-3">
                <IconBox icon={Icon} />
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                {memberCount !== undefined && (
                    <p className="text-xs font-medium text-primary">{memberCount.toLocaleString()} members</p>
                )}
            </CardContent>
        </Card>
    </Link>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="size-6 text-primary" />
    </div>
);

const CTABlock = ({ cta }: { cta: ICTAAction }) => (
    <div className="flex justify-center mt-10">
        <Button size="lg" className="rounded-full px-8 gap-2" asChild>
            <Link href={cta.href}>
                {cta.text}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
);

// ============= TYPES =============
interface IStatItem {
    value: string;
    label: string;
}

interface IChannelItem {
    icon: LucideIcon;
    title: string;
    description: string;
    memberCount?: number;
    href: string;
}

interface ICTAAction {
    text: string;
    href: string;
}

interface ICommunity {
    eyebrow: string;
    title: string;
    subtitle: string;
    stats: IStatItem[];
    channels: IChannelItem[];
    cta?: ICTAAction;
}
