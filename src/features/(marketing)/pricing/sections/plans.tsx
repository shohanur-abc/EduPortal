import { CheckCircle2, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';

// ============= MAIN COMPONENT =============
export default function PricingPlans({ eyebrow, title, subtitle, plans }: IPricingPlans) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <PlansGrid plans={plans} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const PlansGrid = ({ plans }: { plans: IPlanItem[] }) => (
    <div className="grid grid-cols-1 @md:grid-cols-2 @4xl:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, i) => (
            <PlanCard key={i} {...plan} />
        ))}
    </div>
);

const PlanCard = ({ name, description, price, period, features, cta, popular, icon: Icon }: IPlanItem) => (
    <Card className={cn(
        'relative flex flex-col transition-all hover:shadow-lg',
        popular && 'border-primary shadow-md scale-[1.02]'
    )}>
        {popular && <PopularBadge />}
        <CardHeader className="space-y-2">
            {Icon && <Icon className="size-8 text-primary" />}
            <CardTitle className="text-xl">{name}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="flex-1 space-y-6">
            <PriceDisplay price={price} period={period} />
            <FeaturesList features={features} />
        </CardContent>
        <CardFooter>
            <Button
                className="w-full rounded-full"
                variant={popular ? 'default' : 'outline'}
                size="lg"
                asChild
            >
                <Link href={cta.href}>{cta.text}</Link>
            </Button>
        </CardFooter>
    </Card>
);

const PopularBadge = () => (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <Badge className="rounded-full px-4 py-1">Most Popular</Badge>
    </div>
);

const PriceDisplay = ({ price, period }: { price: string; period: string }) => (
    <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight">{price}</span>
        <span className="text-sm text-muted-foreground">/{period}</span>
    </div>
);

const FeaturesList = ({ features }: { features: string[] }) => (
    <ul className="space-y-3">
        {features.map((feature, i) => (
            <FeatureItem key={i} text={feature} />
        ))}
    </ul>
);

const FeatureItem = ({ text }: { text: string }) => (
    <li className="flex items-start gap-2 text-sm">
        <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
        <span className="text-muted-foreground">{text}</span>
    </li>
);

// ============= TYPES =============
interface IPlanItem {
    icon?: LucideIcon;
    name: string;
    description: string;
    price: string;
    period: string;
    features: string[];
    cta: { text: string; href: string };
    popular?: boolean;
}

interface IPricingPlans {
    eyebrow: string;
    title: string;
    subtitle: string;
    plans: IPlanItem[];
}
