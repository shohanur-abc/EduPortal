import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function CaseGrid({ eyebrow, title, subtitle, cases }: ICaseGrid) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <CasesGrid cases={cases} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const CasesGrid = ({ cases }: { cases: ICaseGrid['cases'] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @3xl:grid-cols-3 gap-6">
        {cases.map((caseItem, i) => (
            <CaseCard key={i} {...caseItem} />
        ))}
    </div>
);

const CaseCard = ({
  image,
  logo,
  schoolName,
  title,
  metrics,
  category,
  href,
}: ICaseGrid['cases'][number]) => (
  <Card className="group overflow-hidden hover:shadow-lg transition-shadow pt-0">
    <CaseCardImage image={image} logo={logo} schoolName={schoolName} />
    <CardContent className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-2">
        <Badge variant="secondary" className=" rounded-full shrink-0">
          {category}
        </Badge>
        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
      </div>
      <MetricsRow metrics={metrics} />
      <Button variant="ghost" size="sm" className="px-0 text-primary" asChild>
        <Link className='w-full bg-muted items-center' href={href}>
          View Case Study
          <ArrowRight className="ml-1.5 size-3.5" />
        </Link>
      </Button>
    </CardContent>
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
    <div className="flex flex-wrap justify-between gap-3">
        {metrics.map((metric, i) => (
            <div key={i} className=" text-center">
                <span className="block text-lg font-bold text-primary">{metric.value}</span>
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
