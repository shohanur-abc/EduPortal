import { ArrowRight, PenLine, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function BlogCTA({ title, description, perks, primaryCta, secondaryCta }: IBlogCTA) {
    return (
        <Section>
            <div className="rounded-2xl bg-gray-800 dark:bg-gray-300 px-8 py-16 @lg:px-16 @lg:py-20 space-y-8">
                <ContentArea title={title} description={description} />
                <PerksList perks={perks} />
                <Actions primary={primaryCta} secondary={secondaryCta} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ContentArea = ({ title, description }: { title: string; description: string }) => (
    <div className="text-center space-y-4">
        <div className="size-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto">
            <PenLine className="size-7 text-primary-foreground" />
        </div>
        <h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight text-primary-foreground">
            {title}
        </h2>
        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            {description}
        </p>
    </div>
);

const PerksList = ({ perks }: { perks: string[] }) => (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {perks.map((perk, i) => (
            <PerkItem key={i} text={perk} />
        ))}
    </div>
);

const PerkItem = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2 text-primary-foreground/90 text-sm">
        <CheckCircle className="size-4 shrink-0" />
        <span>{text}</span>
    </div>
);

const Actions = ({ primary, secondary }: { primary: IBlogCTA['primaryCta']; secondary: IBlogCTA['secondaryCta'] }) => (
    <div className="flex flex-col @sm:flex-row items-center justify-center gap-4">
        <Button size="lg" variant="secondary" className="rounded-full px-8" asChild>
            <Link href={primary.href}>
                {primary.text}
                <ArrowRight className="ml-2 size-4" />
            </Link>
        </Button>
        <Button
            size="lg"
            className="rounded-full px-8 border- text-primary-foreground hover:bg-gray-700 dark:hover:bg-gray-100"
            asChild
        >
            <Link href={secondary.href}>{secondary.text}</Link>
        </Button>
    </div>
);

// ============= TYPES =============
interface IBlogCTA {
    title: string;
    description: string;
    perks: string[];
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
}
