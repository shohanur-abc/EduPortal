
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Team({ eyebrow, title, subtitle, members }: ITeam) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <TeamGrid members={members} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const TeamGrid = ({ members }: { members: ITeam['members'] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-1 @lg:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4 gap-6">
        {members.map((member, i) => (
            <MemberCard key={i} {...member} />
        ))}
    </div>
);

const MemberCard = ({ name, role, avatar, bio }: ITeam['members'][number]) => (
    <Card className="group text-center hover:shadow-lg transition-shadow">
        <CardContent className="pt-8 space-y-4">
            <Avatar className="size-24 mx-auto ring-4 ring-background">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="text-2xl">{name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="font-semibold">{name}</h3>
                <p className="text-sm text-primary">{role}</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{bio}</p>
            {/* TODO: Add social media links when icons are finalized */}
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface ITeam {
    eyebrow: string;
    title: string;
    subtitle: string;
    members: {
        name: string;
        role: string;
        avatar: string;
        bio: string;
        socials?: { platform: string; href: string }[];
    }[];
}
