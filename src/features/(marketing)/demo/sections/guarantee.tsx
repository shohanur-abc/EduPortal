import { ShieldCheck, type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function DemoGuarantee({ eyebrow, title, subtitle, guarantees }: IDemoGuarantee) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <GuaranteesList guarantees={guarantees} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const GuaranteesList = ({ guarantees }: { guarantees: IDemoGuarantee['guarantees'] }) => (
    <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {guarantees.map((guarantee, i) => (
            <GuaranteeCard key={i} {...guarantee} />
        ))}
    </div>
);

const GuaranteeCard = ({ icon: Icon = ShieldCheck, title, description }: IGuaranteeItem) => (
    <Card className="text-center hover:shadow-md transition-shadow">
        <CardContent className="pt-8 pb-6 space-y-3">
            <div className="size-12 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto">
                <Icon className="size-6 text-green-600" />
            </div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IDemoGuarantee {
    eyebrow: string;
    title: string;
    subtitle: string;
    guarantees: IGuaranteeItem[];
}

interface IGuaranteeItem {
    icon?: LucideIcon;
    title: string;
    description: string;
}
