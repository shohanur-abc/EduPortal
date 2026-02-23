import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Section } from '@/components/section';
import { ROUTES } from '@/lib/routes';

// ============= MAIN COMPONENT =============
export default function ContactCTA({ eyebrow, title, subtitle, primaryCTA, secondaryCTA }: IContactCTA) {
    return (
        <Section containerClass="bg-muted/50">
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <CTAButtons primary={primaryCTA} secondary={secondaryCTA} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const CTAButtons = ({ primary, secondary }: { primary: ICTAButton; secondary?: ICTAButton }) => (
    <div className="flex flex-col @sm:flex-row items-center justify-center gap-4">
        <Button size="lg" asChild>
            <a href={primary.href ?? ROUTES.marketing.demo}>{primary.label}</a>
        </Button>
        {secondary && (
            <Button variant="outline" size="lg" asChild>
                <a href={secondary.href ?? ROUTES.marketing.contact}>{secondary.label}</a>
            </Button>
        )}
    </div>
);

// ============= TYPES =============
interface IContactCTA {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCTA: ICTAButton;
    secondaryCTA?: ICTAButton;
}

interface ICTAButton {
    label: string;
    href?: string;
}
