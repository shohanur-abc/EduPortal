'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function ContactFAQ({ eyebrow, title, subtitle, items }: IContactFAQ) {
    return (
        <Section className='max-w-3xl mx-auto' eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <Accordion type="single" collapsible>
                {items.map((item, i) => (
                    <FAQEntry key={i} index={i} {...item} />
                ))}
            </Accordion>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const FAQEntry = ({ question, answer, index }: IContactFAQ['items'][0] & { index: number }) => (
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
    items: {
        question: string;
        answer: string;
    }[];
}
