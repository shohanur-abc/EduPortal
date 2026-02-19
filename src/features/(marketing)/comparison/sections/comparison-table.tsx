import { CheckCircle2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function ComparisonTable({ eyebrow, title, subtitle, products, features }: IComparisonTable) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <FeatureTable products={products} features={features} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const FeatureTable = ({ products, features }: Pick<IComparisonTable, 'products' | 'features'>) => (
    <div className="rounded-xl border overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow className="bg-muted/50">
                    <TableHead className="min-w-[200px] font-semibold">Features</TableHead>
                    {products.map((product, i) => (
                        <ProductHeader key={i} {...product} />
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {features.map((feature, i) => (
                    <FeatureRow key={i} feature={feature} productCount={products.length} />
                ))}
            </TableBody>
        </Table>
    </div>
);

const ProductHeader = ({ name, highlighted }: IComparisonTable['products'][number]) => (
    <TableHead className="text-center min-w-[140px]">
        <div className="flex flex-col items-center gap-1">
            <span className="font-semibold">{name}</span>
            {highlighted && (
                <Badge variant="default" className="text-[10px]">Ours</Badge>
            )}
        </div>
    </TableHead>
);

const FeatureRow = ({ feature, productCount }: { feature: IComparisonTable['features'][number]; productCount: number }) => (
    <TableRow>
        <TableCell className="font-medium">
            <div className="space-y-0.5">
                <span>{feature.name}</span>
                {feature.category && (
                    <span className="block text-xs text-muted-foreground">{feature.category}</span>
                )}
            </div>
        </TableCell>
        {feature.availability.slice(0, productCount).map((available, i) => (
            <TableCell key={i} className="text-center">
                <AvailabilityIcon available={available} />
            </TableCell>
        ))}
    </TableRow>
);

const AvailabilityIcon = ({ available }: { available: boolean | string }) => {
    if (typeof available === 'string') {
        return <span className="text-sm text-muted-foreground">{available}</span>;
    }
    return available ? (
        <CheckCircle2 className="size-5 text-green-600 mx-auto" />
    ) : (
        <X className="size-5 text-muted-foreground/40 mx-auto" />
    );
};

// ============= TYPES =============
interface IComparisonTable {
    eyebrow: string;
    title: string;
    subtitle: string;
    products: {
        name: string;
        highlighted?: boolean;
    }[];
    features: {
        name: string;
        category?: string;
        availability: (boolean | string)[];
    }[];
}
