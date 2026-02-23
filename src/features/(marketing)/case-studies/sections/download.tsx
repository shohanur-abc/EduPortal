import { Download, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function DownloadCaseStudy({ title, description, downloads }: IDownloadCaseStudy) {
    return (
        <Section>
            <div className="grid grid-cols-1 @3xl:grid-cols-[1fr_auto] gap-8 items-center">
                <ContentArea title={title} description={description} />
                <DownloadsList downloads={downloads} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const ContentArea = ({ title, description }: { title: string; description: string }) => (
    <div className="space-y-4">
        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <FileText className="size-7 text-primary" />
        </div>
        <h2 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">{title}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">{description}</p>
    </div>
);

const DownloadsList = ({ downloads }: { downloads: IDownloadCaseStudy['downloads'] }) => (
    <div className="flex flex-col gap-4 min-w-0 @3xl:min-w-[320px]">
        {downloads.map((download, i) => (
            <DownloadCard key={i} {...download} />
        ))}
    </div>
);

const DownloadCard = ({ title, fileSize, href }: IDownloadCaseStudy['downloads'][number]) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardContent className="flex items-center gap-4 py-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="size-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{title}</p>
                <p className="text-xs text-muted-foreground">{fileSize}</p>
            </div>
            <Button size="sm" variant="outline" className="rounded-full shrink-0" asChild>
                <Link href={href}>
                    <Download className="mr-1.5 size-3.5" />
                    PDF
                </Link>
            </Button>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IDownloadCaseStudy {
    title: string;
    description: string;
    downloads: {
        title: string;
        fileSize: string;
        href: string;
    }[];
}
