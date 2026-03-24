import { type LucideIcon } from '@/lib/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/molecules";
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function StillHaveQuestions({ eyebrow, title, subtitle, channels }: IStillHaveQuestions) {
    return (
        <Section cols={3} eyebrow={eyebrow} title={title} subtitle={subtitle} className=' max-w-4xl mx-auto'>
            {channels.map((channel, i) => (
                <ChannelCard key={i} {...channel} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ChannelCard = ({ icon: Icon, label, description, buttonLabel, href }: IStillHaveQuestions['channels'][0]) => (
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

interface IStillHaveQuestions {
    eyebrow: string;
    title: string;
    subtitle: string;
    channels: {
        icon: LucideIcon;
        label: string;
        description: string;
        buttonLabel: string;
        href: string;
    }[];
}
