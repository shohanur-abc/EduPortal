import { Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function DemoTestimonial({ quote, author, context }: IDemoTestimonial) {
    return (
        <Section>
            <TestimonialCard quote={quote} author={author} context={context} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const TestimonialCard = ({ quote, author, context }: IDemoTestimonial) => (
    <Card className="max-w-3xl mx-auto bg-primary/5 border-primary/10">
        <CardContent className="pt-8 pb-8 @md:px-12 space-y-6">
            <QuoteIcon />
            <QuoteText text={quote} />
            <AuthorInfo {...author} />
            {context && <ContextNote text={context} />}
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

const AuthorInfo = ({ name, role, school, avatar }: IDemoTestimonial['author']) => (
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

const ContextNote = ({ text }: { text: string }) => (
    <p className="text-xs text-muted-foreground text-center">{text}</p>
);

// ============= TYPES =============
interface IDemoTestimonial {
    quote: string;
    author: {
        name: string;
        role: string;
        school: string;
        avatar?: string;
    };
    context?: string;
}
