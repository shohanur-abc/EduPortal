import { Accordion, Button } from "@/components/molecules";
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function FAQ({ eyebrow, title, subtitle, faqs, ctaText, ctaHref }: IFAQ) {
    return (
        <Section className="max-w-3xl mx-auto space-y-8" containerClass="bg-muted/50" eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <Accordion
                items={faqs.map(({ question, answer }, i) => ({
                    value: `item-${i}`,
                    title: question,
                    content: answer,
                }))}
                className="w-full"
                classNames={{ trigger: "text-left text-base font-medium", contentInner: "text-muted-foreground leading-relaxed" }}
            />
            <div className="text-center">
                <Button variant="outline" className="rounded-full" href={ctaHref}>{ctaText}</Button>
            </div>
        </Section>
    );
}

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
