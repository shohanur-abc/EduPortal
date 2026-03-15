import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function SecurityFAQ({ eyebrow, title, subtitle, items }: ISecurityFAQ) {
    return (
        <Section eyebrow={eyebrow} title={title} subtitle={subtitle} className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
                {items.map((item, i) => (
                    <FAQItem key={i} index={i} {...item} />
                ))}
            </Accordion>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const FAQItem = ({ question, answer, index }: ISecurityFAQ['items'][0] & { index: number }) => (
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
interface ISecurityFAQ {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: {
        question: string;
        answer: string;
    }[];
}
