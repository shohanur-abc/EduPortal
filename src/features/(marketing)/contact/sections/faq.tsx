'use client';

import { Accordion } from '@/components/molecules';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function ContactFAQ({ eyebrow, title, subtitle, items }: IContactFAQ) {
    return (
        <Section className='max-w-3xl mx-auto' eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <Accordion
                items={items.map((item, i) => ({
                    value: `item-${i}`,
                    title: item.question,
                    content: <p className="text-muted-foreground leading-relaxed">{item.answer}</p>,
                }))}
            />
        </Section>
    );
}

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
