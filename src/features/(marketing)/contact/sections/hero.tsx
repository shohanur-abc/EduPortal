import { Badge } from "@/components/molecules";
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function ContactHero({ eyebrow, title, subtitle, badges }: IContactHero) {
    return (
        <Section eyebrow={eyebrow} title={title} subtitle={subtitle} className="flex flex-wrap items-center justify-center gap-3">
            {badges && badges.map((badge, i) => (
                <BadgeItem key={i} {...badge} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const BadgeItem = ({ label, variant = 'secondary' }: NonNullable<IContactHero["badges"]>[number]) => (
    <Badge variant={variant}>{label}</Badge>
);

// ============= TYPES =============
interface IContactHero {
    eyebrow: string;
    title: string;
    subtitle: string;
    badges?: {
        label: string;
        variant?: 'default' | 'secondary' | 'outline';
    }[];
}