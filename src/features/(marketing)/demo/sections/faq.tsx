import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function DemoFAQ({ eyebrow, title, subtitle, items }: IDemoFAQ) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <FAQList items={items} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const FAQList = ({ items }: { items: IDemoFAQ['items'] }) => (
    <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
            {items.map((item, i) => (
                <FAQItem key={i} index={i} {...item} />
            ))}
        </Accordion>
    </div>
);

const FAQItem = ({ question, answer, index }: IFAQItem & { index: number }) => (
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
interface IDemoFAQ {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: IFAQItem[];
}

interface IFAQItem {
    question: string;
    answer: string;
}
