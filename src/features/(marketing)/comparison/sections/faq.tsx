import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function ComparisonFAQ({ eyebrow, title, subtitle, questions }: IComparisonFAQ) {
    return (
        <Section className="max-w-3xl mx-auto" eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <Accordion type="single" collapsible className="w-full">
                {questions.map((q, i) => (
                    <QuestionItem key={i} index={i} {...q} />
                ))}
            </Accordion>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const QuestionItem = ({ index, question, answer }: IComparisonFAQ['questions'][number] & { index: number }) => (
    <AccordionItem value={`item-${index}`}>
        <AccordionTrigger className="text-left text-base font-medium">
            {question}
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground leading-relaxed">
            {answer}
        </AccordionContent>
    </AccordionItem>
);

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
