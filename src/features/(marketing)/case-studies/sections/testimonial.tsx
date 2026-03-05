import { Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Testimonial({ quote, author }: ITestimonial) {
    return (
        <Section>
            <div className="max-w-4xl mx-auto space-y-8">
                <QuoteIcon />
                <QuoteText text={quote} />
                <AuthorInfo {...author} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const QuoteIcon = () => (
    <div className="flex justify-center">
        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Quote className="size-7 text-primary" />
        </div>
    </div>
);

const QuoteText = ({ text }: { text: string }) => (
    <blockquote className="text-xl @sm:text-2xl @lg:text-3xl font-medium text-center leading-relaxed text-foreground">
        &ldquo;{text}&rdquo;
    </blockquote>
);

const AuthorInfo = ({ name, role, school, avatar }: ITestimonial['author']) => (
    <div className="flex flex-col items-center gap-3">
        <Avatar size="lg">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div className="text-center">
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{role}, {school}</p>
        </div>
    </div>
);

// ============= HELPERS =============
const getInitials = (name: string) =>
    name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

// ============= TYPES =============
interface ITestimonial {
    quote: string;
    author: {
        name: string;
        role: string;
        school: string;
        avatar: string;
    };
}
