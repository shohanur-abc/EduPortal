import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';
import Heading from '@/components/heading';

// ============= MAIN COMPONENT =============
export default function StillHaveQuestions({ eyebrow, title, subtitle, channels }: IStillHaveQuestions) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <ChannelsGrid channels={channels} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ChannelsGrid = ({ channels }: { channels: IStillHaveQuestions['channels'] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {channels.map((channel, i) => (
            <ChannelCard key={i} {...channel} />
        ))}
    </div>
);

const ChannelCard = ({ icon: Icon, label, description, buttonLabel, href }: ISupportChannel) => (
    <Card className="text-center">
        <CardContent className="flex flex-col items-center gap-4">
            <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="size-7 text-primary" />
            </div>
            <div className="space-y-1.5">
                <h3 className="text-lg font-semibold text-foreground">{label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
            <Button variant="outline" asChild>
                <a href={href}>{buttonLabel}</a>
            </Button>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface ISupportChannel {
    icon: LucideIcon;
    label: string;
    description: string;
    buttonLabel: string;
    href: string;
}

interface IStillHaveQuestions {
    eyebrow: string;
    title: string;
    subtitle: string;
    channels: ISupportChannel[];
}
