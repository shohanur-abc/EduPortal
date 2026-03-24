import { Accordion } from '@/components/molecules';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function SecurityFAQ({ eyebrow, title, subtitle, items }: ISecurityFAQ) {
    return (
        <Section eyebrow={eyebrow} title={title} subtitle={subtitle} className="max-w-3xl mx-auto">
            <Accordion
                items={items.map((item, i) => ({
                    value: `item-${i}`,
                    title: item.question,
                    content: item.answer,
                }))}
                className="w-full"
                classNames={{ trigger: "text-left text-base font-medium", contentInner: "text-muted-foreground leading-relaxed" }}
            />
        </Section>
    );
}

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
