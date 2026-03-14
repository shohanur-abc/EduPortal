import Image from 'next/image';
import { ArrowRight } from '@/lib/icon';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';
import { NumberTicker } from '@/components/ui/number-ticker';

// ============= MAIN COMPONENT =============
export default function CaseGrid({ eyebrow, title, subtitle, cases }: ICaseGrid) {
    return (
        <Section cols={3} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {cases.map((caseItem, i) => (
                <CaseCard key={i} {...caseItem} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const CaseCard = ({
    image,
    logo,
    schoolName,
    title,
    metrics,
    category,
    href,
}: ICaseGrid['cases'][number]) => (
    <Card className=" relative group overflow-hidden hover:shadow-lg transition-shadow pt-0">
        <CaseCardImage image={image} logo={logo} schoolName={schoolName} />
        <CardContent className="space-y-4">
            <div className="flex flex-col items-start justify-between gap-2">
                <Badge variant="secondary" className="absolute top-1 right-1 rounded-full shrink-0">
                    {category}
                </Badge>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h3>
            </div>
            <MetricsRow metrics={metrics} />
        </CardContent>
        <CardFooter>
            <Button variant="ghost" size="sm" className="px-0 text-primary" asChild>
                <Link className='w-full bg-muted items-center' href={href}>
                    View Case Study
                    <ArrowRight className="ml-1.5 size-3.5" />
                </Link>
            </Button>
        </CardFooter>
    </Card>
);

const CaseCardImage = ({ image, logo, schoolName }: { image: string; logo: string; schoolName: string }) => (
    <div className="relative aspect-video overflow-hidden">
        <Image src={image} alt={schoolName} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute bottom-3 left-3">
            <div className="size-10 rounded-lg bg-white shadow-md overflow-hidden">
                <Image src={logo} alt={`${schoolName} logo`} width={40} height={40} className="object-contain" />
            </div>
        </div>
    </div>
);

const MetricsRow = ({ metrics }: { metrics: ICaseGrid['cases'][number]['metrics'] }) => (
    <div className="flex flex-wrap justify-around gap-3 ">
        {metrics.map((metric, i) => (
            <div key={i} className=" text-center">
                <span className="block text-lg font-bold text-primary">
                    <NumberTicker value={typeof metric.value === 'number' ? metric.value : parseInt(metric.value) || 0} className="text-lg" />
                </span>
                <span className="text-xs text-muted-foreground">{metric.label}</span>
            </div>
        ))}
    </div>
);

// ============= TYPES =============
interface ICaseGrid {
    eyebrow: string;
    title: string;
    subtitle: string;
    cases: {
        image: string;
        logo: string;
        schoolName: string;
        title: string;
        metrics: { value: string; label: string }[];
        category: string;
        href: string;
    }[];
}
