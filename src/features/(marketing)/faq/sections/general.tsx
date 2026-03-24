import { Accordion } from '@/components/molecules';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function GeneralFAQ({ eyebrow, title, subtitle, questions }: IGeneralFAQ) {
    return (
        <Section eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <div className="max-w-3xl mx-auto">
                <Accordion
                    items={questions.map((q, i) => ({
                        value: `general-${i}`,
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
interface IGeneralFAQ {
    eyebrow: string;
    title: string;
    subtitle: string;
    questions: {
        question: string;
        answer: string;
    }[];
}
