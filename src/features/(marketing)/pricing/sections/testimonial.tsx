import { Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function PricingTestimonial({ quote, author, metric }: IPricingTestimonial) {
    return (
        <Section>
            <TestimonialCard quote={quote} author={author} metric={metric} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const TestimonialCard = ({ quote, author, metric }: IPricingTestimonial) => (
    <Card className="max-w-3xl mx-auto bg-primary/5 border-primary/10">
        <CardContent className="pt-8 pb-8 @md:px-12 space-y-6">
            <QuoteIcon />
            <QuoteText text={quote} />
            {metric && <MetricHighlight {...metric} />}
            <AuthorInfo {...author} />
        </CardContent>
    </Card>
);

const QuoteIcon = () => (
    <div className="flex justify-center">
        <Quote className="size-8 text-primary/30" />
    </div>
);

const QuoteText = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl font-medium text-foreground text-center leading-relaxed italic">
        &ldquo;{text}&rdquo;
    </p>
);

const MetricHighlight = ({ value, label }: IROIMetric) => (
    <div className="flex items-center justify-center gap-2 py-2">
        <span className="text-3xl font-bold text-primary">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
    </div>
);

const AuthorInfo = ({ name, role, school, avatar }: IPricingTestimonial['author']) => (
    <div className="flex items-center justify-center gap-3">
        <Avatar className="size-10">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
            <div className="text-sm font-semibold text-foreground">{name}</div>
            <div className="text-xs text-muted-foreground">{role}, {school}</div>
        </div>
    </div>
);

// ============= TYPES =============
interface IROIMetric {
    value: string;
    label: string;
}

interface IPricingTestimonial {
    quote: string;
    author: {
        name: string;
        role: string;
        school: string;
        avatar?: string;
    };
    metric?: IROIMetric;
}
