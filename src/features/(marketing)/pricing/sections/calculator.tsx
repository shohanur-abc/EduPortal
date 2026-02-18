import { Calculator, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function PricingCalculator({ eyebrow, title, subtitle, inputLabel, inputPlaceholder, tiers, note }: IPricingCalculator) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <CalculatorCard
                inputLabel={inputLabel}
                inputPlaceholder={inputPlaceholder}
                tiers={tiers}
                note={note}
            />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const CalculatorCard = ({ inputLabel, inputPlaceholder, tiers, note }: Omit<IPricingCalculator, 'eyebrow' | 'title' | 'subtitle'>) => (
    <Card className="max-w-2xl mx-auto">
        <CardHeader className="items-center space-y-2">
            <CalculatorIcon />
            <CardTitle className="text-lg">{inputLabel}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <StudentInput placeholder={inputPlaceholder} />
            <TiersList tiers={tiers} />
            {note && <NoteText text={note} />}
        </CardContent>
    </Card>
);

const CalculatorIcon = () => (
    <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center">
        <Calculator className="size-7 text-primary" />
    </div>
);

const StudentInput = ({ placeholder }: { placeholder: string }) => (
    <div className="space-y-2">
        <Input
            type="number"
            placeholder={placeholder}
            className="text-center text-lg h-12"
            min={0}
        />
    </div>
);

const TiersList = ({ tiers }: { tiers: IPricingTier[] }) => (
    <div className="space-y-3">
        {tiers.map((tier, i) => (
            <TierRow key={i} {...tier} />
        ))}
    </div>
);

const TierRow = ({ range, pricePerStudent, icon: Icon }: IPricingTier) => (
    <div className="flex flex-col @md:flex-row gap-2 items-center justify-between rounded-lg border p-4">
        <div className="flex items-center gap-3">
            {Icon && <Icon className="size-5 text-primary" />}
            <span className="text-sm font-medium">{range}</span>
        </div>
        <span className="text-sm font-semibold text-primary">{pricePerStudent}</span>
    </div>
);

const NoteText = ({ text }: { text: string }) => (
    <p className="text-xs text-muted-foreground text-center">{text}</p>
);

// ============= TYPES =============
interface IPricingTier {
    icon?: LucideIcon;
    range: string;
    pricePerStudent: string;
}

interface IPricingCalculator {
    eyebrow: string;
    title: string;
    subtitle: string;
    inputLabel: string;
    inputPlaceholder: string;
    tiers: IPricingTier[];
    note?: string;
}
