import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Guarantees({ eyebrow, title, subtitle, guarantees }: IGuarantees) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <GuaranteesGrid guarantees={guarantees} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const GuaranteesGrid = ({ guarantees }: { guarantees: IGuaranteeItem[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
        {guarantees.map((item, i) => (
            <GuaranteeCard key={i} {...item} />
        ))}
    </div>
);

const GuaranteeCard = ({ icon: Icon, title, description }: IGuaranteeItem) => (
    <Card className="text-center hover:border-primary/50 hover:shadow-md transition-all">
        <CardContent className="pt-8 pb-6 space-y-4">
            <IconBox icon={Icon} />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
        <Icon className="size-7 text-primary" />
    </div>
);

// ============= TYPES =============
interface IGuaranteeItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface IGuarantees {
    eyebrow: string;
    title: string;
    subtitle: string;
    guarantees: IGuaranteeItem[];
}
