import { Accordion } from '@/components/molecules';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function ComparisonFAQ({ eyebrow, title, subtitle, questions }: IComparisonFAQ) {
    return (
        <Section className="max-w-3xl mx-auto" eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <Accordion
                items={questions.map((q, i) => ({
                    value: `item-${i}`,
                    title: q.question,
                    content: q.answer,
                }))}
                className="w-full"
                classNames={{ trigger: "text-left text-base font-medium", contentInner: "text-muted-foreground leading-relaxed" }}
            />
        </Section>
    );
}

// ============= TYPES =============
interface IComparisonFAQ {
    eyebrow: string;
    title: string;
    subtitle: string;
    questions: {
        question: string;
        answer: string;
    }[];
}
