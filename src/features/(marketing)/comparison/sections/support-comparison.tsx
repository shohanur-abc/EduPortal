import { CheckCircle2, X, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function SupportComparison({ eyebrow, title, subtitle, providers }: ISupportComparison) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <ProvidersGrid providers={providers} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ProvidersGrid = ({ providers }: { providers: ISupportComparison['providers'] }) => (
    <div className="grid grid-cols-1 @lg:grid-cols-2 @3xl:grid-cols-3 gap-8">
        {providers.map((provider, i) => (
            <ProviderCard key={i} {...provider} />
        ))}
    </div>
);

const ProviderCard = ({ icon: Icon, name, highlighted, supportFeatures }: ISupportComparison['providers'][number]) => (
    <Card className={highlighted ? 'border-primary shadow-lg ring-1 ring-primary/20 relative' : 'relative'}>
        {highlighted && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="default">Our Support</Badge>
            </div>
        )}
        <CardHeader className="text-center space-y-3">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Icon className="size-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">{name}</h3>
        </CardHeader>
        <CardContent className="space-y-3">
            {supportFeatures.map((feature, i) => (
                <SupportFeatureItem key={i} {...feature} />
            ))}
        </CardContent>
    </Card>
);

const SupportFeatureItem = ({ label, available, detail }: ISupportComparison['providers'][number]['supportFeatures'][number]) => (
    <div className="flex items-start gap-2.5">
        {available ? (
            <CheckCircle2 className="size-4 text-green-600 shrink-0 mt-0.5" />
        ) : (
            <X className="size-4 text-muted-foreground/40 shrink-0 mt-0.5" />
        )}
        <div className="min-w-0">
            <span className="text-sm font-medium text-foreground">{label}</span>
            {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
        </div>
    </div>
);

// ============= TYPES =============
interface ISupportComparison {
    eyebrow: string;
    title: string;
    subtitle: string;
    providers: {
        icon: LucideIcon;
        name: string;
        highlighted?: boolean;
        supportFeatures: {
            label: string;
            available: boolean;
            detail?: string;
        }[];
    }[];
}
