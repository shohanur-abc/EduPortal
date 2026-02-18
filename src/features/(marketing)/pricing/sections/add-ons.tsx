import { type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function AddOns({ eyebrow, title, subtitle, addOns }: IAddOns) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <AddOnsGrid addOns={addOns} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const AddOnsGrid = ({ addOns }: { addOns: IAddOnItem[] }) => (
    <div className="grid grid-cols-1 @xl:grid-cols-2 @3xl:grid-cols-3 gap-6">
        {addOns.map((addOn, i) => (
            <AddOnCard key={i} {...addOn} />
        ))}
    </div>
);

const AddOnCard = ({ icon: Icon, name, description, price, tag }: IAddOnItem) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all relative">
        {tag && <TagBadge text={tag} />}
        <CardHeader className="space-y-2">
            {Icon && <AddOnIcon icon={Icon} />}
            <CardTitle className="text-base">{name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            <p className="text-lg font-bold text-primary">{price}</p>
        </CardContent>
    </Card>
);

const AddOnIcon = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="size-5 text-primary" />
    </div>
);

const TagBadge = ({ text }: { text: string }) => (
    <div className="absolute -top-2.5 right-4">
        <Badge variant="secondary" className="rounded-full text-xs">{text}</Badge>
    </div>
);

// ============= TYPES =============
interface IAddOnItem {
    icon?: LucideIcon;
    name: string;
    description: string;
    price: string;
    tag?: string;
}

interface IAddOns {
    eyebrow: string;
    title: string;
    subtitle: string;
    addOns: IAddOnItem[];
}
