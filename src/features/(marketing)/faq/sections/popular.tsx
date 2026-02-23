import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';
import Heading from '@/components/heading';

// ============= MAIN COMPONENT =============
export default function PopularFAQ({ eyebrow, title, subtitle, questions }: IPopularFAQ) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <QuestionsGrid questions={questions} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const QuestionsGrid = ({ questions }: { questions: IPopularFAQ['questions'] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-6">
        {questions.map((q, i) => (
            <QuestionCard key={i} {...q} />
        ))}
    </div>
);

const QuestionCard = ({ icon: Icon, question, answer, category }: IPopularQuestion) => (
    <Card className="h-full">
        <CardHeader className="flex-row items-start gap-3">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="size-5 text-primary" />
            </div>
            <div className="space-y-1.5 min-w-0">
                <h3 className="text-sm font-semibold text-foreground leading-snug">{question}</h3>
                {category && <Badge variant="secondary">{category}</Badge>}
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IPopularQuestion {
    icon: LucideIcon;
    question: string;
    answer: string;
    category?: string;
}

interface IPopularFAQ {
    eyebrow: string;
    title: string;
    subtitle: string;
    questions: IPopularQuestion[];
}
