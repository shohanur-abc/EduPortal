import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';
import { ROUTES } from '@/lib/routes';

// ============= MAIN COMPONENT =============
export default function CaseStudiesPreview({ eyebrow, title, subtitle, studies, viewAllText }: ICaseStudiesPreview) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <Grid studies={studies} />
            {viewAllText && <ViewAllLink text={viewAllText} />}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const Grid = ({ studies }: { studies: ICaseStudyItem[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
        {studies.map((study, i) => (
            <StudyCard key={i} {...study} />
        ))}
    </div>
);

const StudyCard = ({ logo, schoolName, metric, metricLabel, summary, tags, href }: ICaseStudyItem) => (
    <Link href={href} className="group block">
        <Card className="h-full overflow-hidden hover:border-primary/50 hover:shadow-md transition-all">
            <CardContent className="pt-6 space-y-4">
                <LogoBlock src={logo} alt={schoolName} />
                <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                    {schoolName}
                </h3>
                <MetricHighlight value={metric} label={metricLabel} />
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {summary}
                </p>
                {tags && (
                    <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                    </div>
                )}
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read more
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
            </CardContent>
        </Card>
    </Link>
);

const LogoBlock = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative h-10 w-28">
        <Image src={src} alt={alt} fill className="object-contain object-left" />
    </div>
);

const MetricHighlight = ({ value, label }: { value: string; label: string }) => (
    <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-primary">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
    </div>
);

const ViewAllLink = ({ text }: { text: string }) => (
    <div className="flex justify-center mt-10">
        <Button variant="outline" size="lg" className="rounded-full px-8 gap-2" asChild>
            <Link href={ROUTES.marketing.caseStudies}>
                {text}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
);

// ============= TYPES =============
interface ICaseStudyItem {
    logo: string;
    schoolName: string;
    metric: string;
    metricLabel: string;
    summary: string;
    tags?: string[];
    href: string;
}

interface ICaseStudiesPreview {
    eyebrow: string;
    title: string;
    subtitle: string;
    studies: ICaseStudyItem[];
    viewAllText?: string;
}
