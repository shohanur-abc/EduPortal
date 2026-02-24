import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function ContactHero({ eyebrow, title, subtitle, badges }: IContactHero) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            {badges && <BadgeRow badges={badges} />}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const BadgeRow = ({ badges }: { badges: IContactHero['badges'] }) => (
    <div className="flex flex-wrap items-center justify-center gap-3">
        {badges?.map((badge, i) => (
            <BadgeItem key={i} {...badge} />
        ))}
    </div>
);

const BadgeItem = ({ label, variant = 'secondary' }: IContactHeroBadge) => (
    <Badge variant={variant}>{label}</Badge>
);

// ============= TYPES =============
interface IContactHero {
    eyebrow: string;
    title: string;
    subtitle: string;
    badges?: IContactHeroBadge[];
}

interface IContactHeroBadge {
    label: string;
    variant?: 'default' | 'secondary' | 'outline';
}
