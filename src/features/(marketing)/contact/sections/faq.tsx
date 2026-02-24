'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function ContactFAQ({ eyebrow, title, subtitle, items }: IContactFAQ) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <FAQList items={items} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const FAQList = ({ items }: { items: IFAQItem[] }) => (
    <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible>
            {items.map((item, i) => (
                <FAQEntry key={i} index={i} {...item} />
            ))}
        </Accordion>
    </div>
);

const FAQEntry = ({ question, answer, index }: IFAQItem & { index: number }) => (
    <AccordionItem value={`item-${index}`}>
        <AccordionTrigger>{question}</AccordionTrigger>
        <AccordionContent>
            <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </AccordionContent>
    </AccordionItem>
);

// ============= TYPES =============
interface IContactFAQ {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: IFAQItem[];
}

interface IFAQItem {
    question: string;
    answer: string;
}
