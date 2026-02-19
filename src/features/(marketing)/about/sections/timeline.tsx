import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Timeline({ eyebrow, title, subtitle, milestones }: ITimeline) {
    return (
        <Section containerClass="bg-muted/50">
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <MilestoneList milestones={milestones} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const MilestoneList = ({ milestones }: { milestones: ITimeline['milestones'] }) => (
    <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-4 @lg:left-1/2 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-12">
            {milestones.map((milestone, i) => (
                <MilestoneItem key={i} {...milestone} index={i} />
            ))}
        </div>
    </div>
);

const MilestoneItem = ({ year, title, description, index }: ITimeline['milestones'][number] & { index: number }) => (
    <div className={`relative flex items-start gap-6 pl-12 @lg:pl-0 ${index % 2 === 0 ? '@lg:flex-row' : '@lg:flex-row-reverse'}`}>
        <div className="absolute left-4 @lg:left-1/2 -translate-x-1/2 size-3 rounded-full bg-primary ring-4 ring-background mt-2" />
        <div className={`@lg:w-1/2 ${index % 2 === 0 ? '@lg:text-right @lg:pr-12' : '@lg:text-left @lg:pl-12'}`}>
            <Card className="inline-block">
                <CardContent className="p-6 space-y-2">
                    <span className="text-sm font-bold text-primary">{year}</span>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        </div>
    </div>
);

// ============= TYPES =============
interface ITimeline {
    eyebrow: string;
    title: string;
    subtitle: string;
    milestones: {
        year: string;
        title: string;
        description: string;
    }[];
}
