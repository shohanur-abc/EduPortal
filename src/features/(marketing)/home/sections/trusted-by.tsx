import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function TrustedBy({ eyebrow, title, subtitle, logos, metrics }: ITrustedBy) {
    return (
        <Section containerClass="bg-muted/50">
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <div className="space-y-12">
                <LogoGrid logos={logos} />
                <MetricsRow metrics={metrics} />
            </div>
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
    <div className="grid grid-cols-2 @lg:grid-cols-4 gap-6">
        {metrics.map(({ value, label, description }, i) => (
            <Card key={i} className="text-center">
                <CardContent className="pt-6 space-y-1">
                    <div className="text-3xl @sm:text-4xl font-bold text-primary">{value}</div>
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
        value: string;
        label: string;
        description: string;
    }[];
}
