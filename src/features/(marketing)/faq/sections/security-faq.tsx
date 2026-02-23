import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Section } from '@/components/section';
import Heading from '@/components/heading';

// ============= MAIN COMPONENT =============
export default function SecurityFAQ({ eyebrow, title, subtitle, questions }: ISecurityFAQ) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <QuestionsList questions={questions} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const QuestionsList = ({ questions }: { questions: ISecurityFAQ['questions'] }) => (
    <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible>
            {questions.map((q, i) => (
                <QuestionItem key={i} index={i} {...q} />
            ))}
        </Accordion>
    </div>
);

const QuestionItem = ({ question, answer, index }: ISecurityFAQItem & { index: number }) => (
    <AccordionItem value={`security-${index}`}>
        <AccordionTrigger className="text-left text-base font-semibold">{question}</AccordionTrigger>
        <AccordionContent className="text-muted-foreground leading-relaxed">{answer}</AccordionContent>
    </AccordionItem>
);

// ============= TYPES =============
interface ISecurityFAQItem {
    question: string;
    answer: string;
}

interface ISecurityFAQ {
    eyebrow: string;
    title: string;
    subtitle: string;
    questions: ISecurityFAQItem[];
}
