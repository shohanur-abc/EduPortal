import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Api({ eyebrow, title, description, badge, codePreview, features, cta }: IApi) {
    return (
        <Section containerClass="bg-muted/50">
            <div className="grid grid-cols-1 @xl:grid-cols-2 gap-12 @xl:gap-16 items-center">
                <ContentBlock eyebrow={eyebrow} title={title} description={description} badge={badge} features={features} cta={cta} />
                <CodePreviewCard {...codePreview} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ContentBlock = ({ eyebrow, title, description, badge, features, cta }: Omit<IApi, 'codePreview'>) => (
    <div className="space-y-6">
        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl font-bold tracking-tight text-foreground">{title}</h2>
        <p className="text-muted-foreground text-base @sm:text-lg leading-relaxed">{description}</p>
        <Badge variant="outline" className="text-sm">{badge}</Badge>
        {features && <FeatureList features={features} />}
        {cta && (
            <div className="pt-2">
                <Button size="lg" className="rounded-full px-8" asChild>
                    <Link href={cta.href}>
                        {cta.text}
                        <ArrowRight className="ml-2 size-4" />
                    </Link>
                </Button>
            </div>
        )}
    </div>
);

const FeatureList = ({ features }: { features: IApiFeature[] }) => (
    <ul className="space-y-3 pt-2">
        {features.map((feature, i) => (
            <FeatureItem key={i} {...feature} />
        ))}
    </ul>
);

const FeatureItem = ({ icon: Icon, text }: IApiFeature) => (
    <li className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="size-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="size-4 text-primary" />
        </div>
        {text}
    </li>
);

const CodePreviewCard = ({ title, language, code }: ICodePreview) => (
    <Card className="overflow-hidden border-2">
        <CardHeader className="bg-muted/50 border-b py-3 px-4 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-mono">{title}</CardTitle>
            <Badge variant="outline" className="text-xs font-mono">{language}</Badge>
        </CardHeader>
        <CardContent className="p-0">
            <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
                <code className="text-foreground font-mono">{code}</code>
            </pre>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IApiFeature {
    icon: LucideIcon;
    text: string;
}

interface ICodePreview {
    title: string;
    language: string;
    code: string;
}

interface IApi {
    eyebrow: string;
    title: string;
    description: string;
    badge: string;
    codePreview: ICodePreview;
    features?: IApiFeature[];
    cta?: { text: string; href: string };
}
