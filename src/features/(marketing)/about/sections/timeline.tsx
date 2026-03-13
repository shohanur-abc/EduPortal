import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Timeline({ eyebrow, title, subtitle, milestones }: ITimeline) {
    return (
        <Section className='relative max-w-3xl mx-auto' containerClass="bg-muted/50" eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <div className="absolute left-4 @lg:left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-12">
                {milestones.map((milestone, i) => (
                    <MilestoneItem key={i} {...milestone} index={i} />
                ))}
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const MilestoneItem = ({ year, title, description, index }: ITimeline['milestones'][number] & { index: number }) => (
    <div className={`relative flex items-start gap-6 pl-12 @lg:pl-0 ${index % 2 === 0 ? '@lg:flex-row' : '@lg:flex-row-reverse'}`}>
        <div className="absolute top-[20%] left-4 @lg:left-1/2 -translate-x-1/2 size-3 rounded-full bg-primary ring-4 ring-background mt-2" />
        <div className={`@lg:w-1/2 ${index % 2 === 0 ? '@lg:text-right @lg:pr-12' : '@lg:text-left @lg:pl-12'}`}>
            <Card className=" relative overflow-hidden inline-block py-0">
                <CardContent className="p-6 space-y-2 ">
                    <span className={`text-lg font-bold text-muted-foreground absolute top-0 bg-accent p-2 pt-1 ${index % 2 === 0 ? 'right-0 @lg:right-auto @lg:left-0  @lg:rounded-br-full @lg:rounded-bl-none rounded-bl-full @lg:pr-5 @lg:pl-2 pl-5' : 'right-0  rounded-bl-full pl-5'}`}>{year}</span>
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
