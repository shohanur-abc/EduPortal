import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Pricing({ eyebrow, title, subtitle, plans }: IPricing) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <PlansGrid plans={plans} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const PlansGrid = ({ plans }: { plans: IPricing['plans'] }) => (
    <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
            <PlanCard key={i} {...plan} />
        ))}
    </div>
);

const PlanCard = ({ name, description, price, period, features, cta, popular }: IPricing['plans'][number]) => (
    <Card className={`relative flex flex-col ${popular ? 'border-primary shadow-lg scale-[1.02]' : ''}`}>
        {popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="rounded-full px-4">Most Popular</Badge>
            </div>
        )}
        <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-6">
            <div className="text-center">
                <span className="text-4xl font-bold">{price}</span>
                {period && <span className="text-muted-foreground ml-1">/{period}</span>}
            </div>
            <Separator />
            <ul className="space-y-3">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
        <CardFooter>
            <Button className="w-full rounded-full" variant={popular ? 'default' : 'outline'} asChild>
                <Link href={cta.href}>
                    {cta.text}
                    <ArrowRight className="ml-2 size-4" />
                </Link>
            </Button>
        </CardFooter>
    </Card>
);

// ============= TYPES =============
interface IPricing {
    eyebrow: string;
    title: string;
    subtitle: string;
    plans: {
        name: string;
        description: string;
        price: string;
        period?: string;
        features: string[];
        cta: { text: string; href: string };
        popular?: boolean;
    }[];
}
