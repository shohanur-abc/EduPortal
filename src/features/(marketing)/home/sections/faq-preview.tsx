import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function FAQ({ eyebrow, title, subtitle, faqs, ctaText, ctaHref }: IFAQ) {
    return (
        <Section containerClass="bg-muted/50">
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <div className="max-w-3xl mx-auto space-y-8">
                <FAQList faqs={faqs} />
                <CTALink text={ctaText} href={ctaHref} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const FAQList = ({ faqs }: { faqs: IFAQ['faqs'] }) => (
    <Accordion type="single" collapsible className="w-full">
        {faqs.map(({ question, answer }, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">{question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{answer}</AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
);

const CTALink = ({ text, href }: { text: string; href: string }) => (
    <div className="text-center">
        <Button variant="outline" className="rounded-full" asChild>
            <Link href={href}>{text}</Link>
        </Button>
    </div>
);

// ============= TYPES =============
interface IFAQ {
    eyebrow: string;
    title: string;
    subtitle: string;
    faqs: {
        question: string;
        answer: string;
    }[];
    ctaText: string;
    ctaHref: string;
}
