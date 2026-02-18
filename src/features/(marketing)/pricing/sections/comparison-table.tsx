import { CheckCircle2, Minus } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function ComparisonTable({ eyebrow, title, subtitle, plans, categories }: IComparisonTable) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <TableWrapper plans={plans} categories={categories} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const TableWrapper = ({ plans, categories }: { plans: string[]; categories: IFeatureCategory[] }) => (
    <div className="overflow-x-auto rounded-xl border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[280px] text-base font-semibold">Features</TableHead>
                    {plans.map((plan, i) => (
                        <TableHead key={i} className="text-center text-base font-semibold">{plan}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category, i) => (
                    <CategoryRows key={i} {...category} planCount={plans.length} />
                ))}
            </TableBody>
        </Table>
    </div>
);

const CategoryRows = ({ name, features, planCount }: IFeatureCategory & { planCount: number }) => (
    <>
        <TableRow className="bg-muted/50">
            <TableCell colSpan={planCount + 1} className="font-semibold text-sm">
                {name}
            </TableCell>
        </TableRow>
        {features.map((feature, i) => (
            <FeatureRow key={i} {...feature} />
        ))}
    </>
);

const FeatureRow = ({ name, availability }: IFeatureRow) => (
    <TableRow>
        <TableCell className="text-sm text-muted-foreground">{name}</TableCell>
        {availability.map((value, i) => (
            <TableCell key={i} className="text-center">
                <CellValue value={value} />
            </TableCell>
        ))}
    </TableRow>
);

const CellValue = ({ value }: { value: boolean | string }) => {
    if (typeof value === 'boolean') {
        return value
            ? <CheckCircle2 className="size-5 text-primary mx-auto" />
            : <Minus className="size-5 text-muted-foreground/40 mx-auto" />;
    }
    return <span className="text-sm text-muted-foreground">{value}</span>;
};

// ============= TYPES =============
interface IFeatureRow {
    name: string;
    availability: (boolean | string)[];
}

interface IFeatureCategory {
    name: string;
    features: IFeatureRow[];
}

interface IComparisonTable {
    eyebrow: string;
    title: string;
    subtitle: string;
    plans: string[];
    categories: IFeatureCategory[];
}
