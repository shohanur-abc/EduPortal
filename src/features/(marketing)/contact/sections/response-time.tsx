'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Heading from '@/components/heading';
import { Section } from '@/components/section';
import { getIcon } from '@/lib/icons';

// ============= MAIN COMPONENT =============
export default function ResponseTime({ eyebrow, title, subtitle, channels }: IResponseTime) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <ChannelsGrid channels={channels} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ChannelsGrid = ({ channels }: { channels: IResponseChannel[] }) => (
    <div className="grid grid-cols-1 @md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {channels.map((channel, i) => (
            <ChannelCard key={i} {...channel} />
        ))}
    </div>
);

const ChannelCard = ({ icon: iconName, channel, averageTime, satisfactionPercent, note }: IResponseChannel) => {
    const Icon = getIcon(iconName);
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle>{channel}</CardTitle>
                        <p className="text-sm text-muted-foreground">{averageTime}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <SatisfactionBar label="Satisfaction" value={satisfactionPercent} />
                {note && <p className="text-xs text-muted-foreground">{note}</p>}
            </CardContent>
        </Card>
    );
};

const SatisfactionBar = ({ label, value }: { label: string; value: number }) => (
    <div className="space-y-1.5">
        <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="text-xs font-medium text-foreground">{value}%</span>
        </div>
        <Progress value={value} />
    </div>
);

// ============= TYPES =============
interface IResponseTime {
    eyebrow: string;
    title: string;
    subtitle: string;
    channels: IResponseChannel[];
}

interface IResponseChannel {
    icon: string;
    channel: string;
    averageTime: string;
    satisfactionPercent: number;
    note?: string;
}
