import Image from 'next/image';
import { ArrowRight } from '@/lib/icon';
import { Button, Badge } from "@/components/molecules";
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function FeaturedCase({ eyebrow, title, subtitle, caseStudy }: IFeaturedCase) {
    return (
        <Section className='grid grid-cols-1 @5xl:grid-cols-2 gap-8 @3xl:gap-12 items-center' eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <CaseImage src={caseStudy.image} alt={caseStudy.schoolName} />
            <CaseContent {...caseStudy} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const CaseImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
    </div>
);

const CaseContent = ({ schoolName, category, challenge, solution, results, href }: IFeaturedCase['caseStudy']) => (
    <div className="space-y-6">
        <div className="space-y-3">
            <Badge variant="secondary" className="rounded-full">{category}</Badge>
            <h3 className="text-2xl @sm:text-3xl font-bold tracking-tight">{schoolName}</h3>
        </div>
        <CaseDetail label="Challenge" text={challenge} />
        <CaseDetail label="Solution" text={solution} />
        <ResultsBadges results={results} />
        <Button className="rounded-full px-6" href={href} rightIcon={<ArrowRight className="size-4" />}>
Read Full Story
</Button>
    </div>
);

const CaseDetail = ({ label, text }: { label: string; text: string }) => (
    <div className="space-y-1">
        <span className="text-sm font-semibold text-primary">{label}</span>
        <p className="text-muted-foreground leading-relaxed">{text}</p>
    </div>
);

const ResultsBadges = ({ results }: { results: IFeaturedCase['caseStudy']['results'] }) => (
    <div className="flex flex-wrap gap-2">
        {results.map((result, i) => (
            <Badge key={i} variant="outline" className="rounded-full py-1.5 px-3 text-sm">
                <span className="font-bold text-primary mr-1">{result.value}</span>
                {result.label}
            </Badge>
        ))}
    </div>
);

// ============= TYPES =============
interface IFeaturedCase {
    eyebrow: string;
    title: string;
    subtitle: string;
    caseStudy: {
        image: string;
        schoolName: string;
        category: string;
        challenge: string;
        solution: string;
        results: { value: string; label: string }[];
        href: string;
    };
}
