import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function PricingHero({ eyebrow, title, highlight, description, billingHint }: IPricingHero) {
    return (
        <Section className="space-y-8">
            <EyebrowBadge text={eyebrow} />
            <Title text={title} highlight={highlight} />
            <Description text={description} />
            {billingHint && <BillingHint text={billingHint} />}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const EyebrowBadge = ({ text }: { text: string }) => (
    <div className="flex justify-center">
        <Badge variant="secondary" className="rounded-full px-4 py-1">{text}</Badge>
    </div>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center leading-tight">
        {text}{' '}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
);

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @sm:text-xl text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
        {text}
    </p>
);

const BillingHint = ({ text }: { text: string }) => (
    <p className="text-sm text-muted-foreground text-center font-medium">
        {text}
    </p>
);

// ============= TYPES =============
interface IPricingHero {
    eyebrow: string;
    title: string;
    highlight?: string;
    description: string;
    billingHint?: string;
}
