import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function DemoCTA({ title, description, primaryCta, secondaryCta }: IDemoCTA) {
    return (
        <Section>
            <div className="rounded-2xl bg-primary px-8 py-16 @lg:px-16 @lg:py-20 text-center space-y-6">
                <Title text={title} />
                <Description text={description} />
                <Actions primary={primaryCta} secondary={secondaryCta} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight text-primary-foreground">{text}</h2>
);

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">{text}</p>
);

const Actions = ({ primary, secondary }: { primary: IDemoCTA['primaryCta']; secondary?: IDemoCTA['secondaryCta'] }) => (
    <div className="flex flex-col @sm:flex-row items-center justify-center gap-4">
        <Button size="lg" variant="secondary" className="rounded-full px-8" asChild>
            <Link href={primary.href}>
                {primary.text}
                <ArrowRight className="ml-2 size-4" />
            </Link>
        </Button>
        {secondary && (
            <Button size="lg" variant="outline" className="rounded-full px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href={secondary.href}>{secondary.text}</Link>
            </Button>
        )}
    </div>
);

// ============= TYPES =============
interface IDemoCTA {
    title: string;
    description: string;
    primaryCta: { text: string; href: string };
    secondaryCta?: { text: string; href: string };
}
