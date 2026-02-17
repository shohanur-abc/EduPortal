import { CheckCircle2, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Enterprise({ title, description, features, cta, icon: Icon }: IEnterprise) {
    return (
        <Section>
            <EnterpriseCard title={title} description={description} features={features} cta={cta} icon={Icon} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const EnterpriseCard = ({ title, description, features, cta, icon: Icon }: IEnterprise) => (
    <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 px-8 py-12 @lg:px-16 @lg:py-16 space-y-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
            {Icon && <IconBox icon={Icon} />}
            <Title text={title} />
            <Description text={description} />
        </div>
        <FeaturesList features={features} />
        <CTAButton {...cta} />
    </div>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
        <Icon className="size-8 text-primary" />
    </div>
);

const Title = ({ text }: { text: string }) => (
    <h2 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">{text}</h2>
);

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground leading-relaxed">{text}</p>
);

const FeaturesList = ({ features }: { features: string[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {features.map((feature, i) => (
            <FeatureItem key={i} text={feature} />
        ))}
    </div>
);

const FeatureItem = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2 text-sm">
        <CheckCircle2 className="size-4 text-primary shrink-0" />
        <span className="text-muted-foreground">{text}</span>
    </div>
);

const CTAButton = ({ text, href }: IEnterprise['cta']) => (
    <div className="flex justify-center">
        <Button size="lg" className="rounded-full px-8" asChild>
            <Link href={href}>
                {text}
                <ArrowRight className="ml-2 size-4" />
            </Link>
        </Button>
    </div>
);

// ============= TYPES =============
interface IEnterprise {
    icon?: LucideIcon;
    title: string;
    description: string;
    features: string[];
    cta: { text: string; href: string };
}
