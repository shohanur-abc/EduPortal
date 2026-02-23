import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Industries({ eyebrow, title, subtitle, industries }: IIndustries) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <IndustriesGrid industries={industries} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const IndustriesGrid = ({ industries }: { industries: IIndustries['industries'] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-6">
        {industries.map((industry, i) => (
            <IndustryCard key={i} {...industry} />
        ))}
    </div>
);

const IndustryCard = ({ icon: Icon, name, description, schoolCount }: IIndustries['industries'][number]) => (
    <Card className="group hover:shadow-lg hover:border-primary/30 transition-all">
        <CardContent className="pt-6 space-y-4">
            <div className="flex items-start justify-between">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="size-6 text-primary" />
                </div>
                <Badge variant="outline" className="rounded-full">{schoolCount} schools</Badge>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IIndustries {
    eyebrow: string;
    title: string;
    subtitle: string;
    industries: {
        icon: LucideIcon;
        name: string;
        description: string;
        schoolCount: number;
    }[];
}
