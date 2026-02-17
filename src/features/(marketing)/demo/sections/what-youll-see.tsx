import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function WhatYoullSee({ eyebrow, title, subtitle, items }: IWhatYoullSee) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <ModulesGrid items={items} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ModulesGrid = ({ items }: { items: IWhatYoullSee['items'] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4 gap-6">
        {items.map((item, i) => (
            <ModuleCard key={i} {...item} />
        ))}
    </div>
);

const ModuleCard = ({ icon: Icon, title, description }: IDemoModule) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="space-y-3 pb-2">
            <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="size-5 text-primary" />
            </div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IWhatYoullSee {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: IDemoModule[];
}

interface IDemoModule {
    icon: LucideIcon;
    title: string;
    description: string;
}
