import { Calendar, Clock, Play, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Webinars({ eyebrow, title, subtitle, webinars }: IWebinars) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <Grid webinars={webinars} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const Grid = ({ webinars }: { webinars: IWebinarItem[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
        {webinars.map((webinar, i) => (
            <WebinarCard key={i} {...webinar} />
        ))}
    </div>
);

const WebinarCard = ({ status, title, description, date, duration, speaker, attendees, actionUrl }: IWebinarItem) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all flex flex-col">
        <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
                <StatusBadge status={status} />
                {duration && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {duration}
                    </span>
                )}
            </div>
            <CardTitle className="text-lg leading-snug">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4" />
                <span>{date}</span>
            </div>
            <SpeakerInfo speaker={speaker} />
            {attendees !== undefined && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="size-3.5" />
                    <span>{attendees} attendees</span>
                </div>
            )}
        </CardContent>
        <CardFooter>
            <Button
                variant={status === 'upcoming' ? 'default' : 'outline'}
                className="w-full gap-2"
                asChild
            >
                <a href={actionUrl}>
                    {status === 'upcoming' ? 'Register Now' : <><Play className="size-4" /> Watch Recording</>}
                </a>
            </Button>
        </CardFooter>
    </Card>
);

const StatusBadge = ({ status }: { status: IWebinarItem['status'] }) => (
    <Badge variant={status === 'upcoming' ? 'default' : 'secondary'} className="text-xs">
        {status === 'upcoming' ? 'Upcoming' : 'Recorded'}
    </Badge>
);

const SpeakerInfo = ({ speaker }: { speaker: ISpeaker }) => (
    <div className="flex items-center gap-3">
        <Avatar className="size-8">
            <AvatarImage src={speaker.avatar} alt={speaker.name} />
            <AvatarFallback>{getInitials(speaker.name)}</AvatarFallback>
        </Avatar>
        <div>
            <p className="text-sm font-medium">{speaker.name}</p>
            <p className="text-xs text-muted-foreground">{speaker.role}</p>
        </div>
    </div>
);

// ============= HELPERS =============
const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

// ============= TYPES =============
interface ISpeaker {
    name: string;
    role: string;
    avatar?: string;
}

interface IWebinarItem {
    status: 'upcoming' | 'recorded';
    title: string;
    description: string;
    date: string;
    duration?: string;
    speaker: ISpeaker;
    attendees?: number;
    actionUrl: string;
}

interface IWebinars {
    eyebrow: string;
    title: string;
    subtitle: string;
    webinars: IWebinarItem[];
}
