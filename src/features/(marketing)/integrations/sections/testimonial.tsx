import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Testimonial({ quote, author, role, school, avatar, logo }: ITestimonial) {
    return (
        <Section>
            <TestimonialCard quote={quote} author={author} role={role} school={school} avatar={avatar} logo={logo} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const TestimonialCard = ({ quote, author, role, school, avatar, logo }: ITestimonial) => (
    <Card className="max-w-4xl mx-auto border-2 py-0">
        <CardContent className="p-8 @lg:p-12 space-y-8">
            <QuoteIcon />
            <QuoteText text={quote} />
            <AuthorInfo author={author} role={role} school={school} avatar={avatar} />
        </CardContent>
    </Card>
);

const QuoteIcon = () => (
    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
        <svg className="size-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391C0 7.905 3.748 4.039 9 3l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
        </svg>
    </div>
);

const QuoteText = ({ text }: { text: string }) => (
    <blockquote className="text-lg @sm:text-xl @lg:text-2xl font-medium leading-relaxed text-foreground">
        &ldquo;{text}&rdquo;
    </blockquote>
);

const AuthorInfo = ({ author, role, school, avatar, logo }: Omit<ITestimonial, 'quote'>) => (
    <div className="flex flex-col @sm:flex-row items-start @sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            {avatar && (
                <div className="size-12 rounded-full overflow-hidden relative shrink-0">
                    <Image src={avatar} alt={author} fill className="object-cover" sizes="48px" />
                </div>
            )}
            <div>
                <p className="font-semibold text-foreground">{author}</p>
                <p className="text-sm text-muted-foreground">{role}, {school}</p>
            </div>
        </div>
        {logo && (
            <div className="h-8 w-24 relative shrink-0">
                <Image src={logo} alt={school} fill className="object-contain" sizes="96px" />
            </div>
        )}
    </div>
);

// ============= TYPES =============
interface ITestimonial {
    quote: string;
    author: string;
    role: string;
    school: string;
    avatar?: string;
    logo?: string;
}
