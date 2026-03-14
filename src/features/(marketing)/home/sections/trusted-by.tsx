import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';
import { NumberTicker } from '@/components/ui/number-ticker';

// ============= MAIN COMPONENT =============
export default function TrustedBy({ eyebrow, title, subtitle, logos, metrics }: ITrustedBy) {
    return (
        <Section className="space-y-12" eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <LogoGrid logos={logos} />
            <MetricsRow metrics={metrics} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const LogoGrid = ({ logos }: { logos: ITrustedBy['logos'] }) => (
    <div className="flex flex-wrap justify-center items-center gap-8 @lg:gap-12">
        {logos.map(({ name, logo, href }, i) => (
            <Link key={i} href={href} className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                <Image src={logo} alt={name} width={120} height={40} className="h-8 @sm:h-10 w-auto" />
            </Link>
        ))}
    </div>
);

const MetricsRow = ({ metrics }: { metrics: ITrustedBy['metrics'] }) => (
    <div className="grid grid-cols-2 @3xl:grid-cols-4 gap-6">
        {metrics.map(({ value, label, description }, i) => (
            <Card key={i} className="text-center">
                <CardContent className="space-y-1">
                    <div className="text-3xl @sm:text-4xl font-bold text-primary">
                        <NumberTicker value={typeof value === 'number' ? value : parseInt(value) || 0} className="text-3xl @sm:text-4xl" />
                    </div>
                    <div className="font-semibold text-sm">{label}</div>
                    <div className="text-xs text-muted-foreground">{description}</div>
                </CardContent>
            </Card>
        ))}
    </div>
);

// ============= TYPES =============
interface ITrustedBy {
    eyebrow: string;
    title: string;
    subtitle: string;
    logos: {
        name: string;
        logo: string;
        href: string;
    }[];
    metrics: {
        value: string | number;
        label: string;
        description: string;
    }[];
}
