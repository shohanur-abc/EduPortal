import { Accordion } from '@/components/molecules';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function TechnicalFAQ({ eyebrow, title, subtitle, questions }: ITechnicalFAQ) {
    return (
        <Section eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <div className="max-w-3xl mx-auto">
                <Accordion
                    items={questions.map((q, i) => ({
                        value: `technical-${i}`,
                        title: q.question,
                        content: q.answer,
                    }))}
                    classNames={{ trigger: "text-left text-base font-semibold", contentInner: "text-muted-foreground leading-relaxed" }}
                />
            </div>
        </Section>
    );
}

// ============= TYPES =============
interface ITechnicalFAQ {
    eyebrow: string;
    title: string;
    subtitle: string;
    questions: {
        question: string;
        answer: string;
    }[];
}
