import { Accordion } from '@/components/molecules';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function SecurityFAQ({ eyebrow, title, subtitle, questions }: ISecurityFAQ) {
    return (
        <Section eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <div className="max-w-3xl mx-auto">
                <Accordion
                    items={questions.map((q, i) => ({
                        value: `security-${i}`,
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
interface ISecurityFAQ {
    eyebrow: string;
    title: string;
    subtitle: string;
    questions: {
        question: string;
        answer: string;
    }[];
}
