import { Star } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Testimonials({ eyebrow, title, subtitle, testimonials, featured }: ITestimonials) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <div className="space-y-8">
                {featured && <FeaturedTestimonial {...featured} />}
                <TestimonialsGrid testimonials={testimonials} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const FeaturedTestimonial = ({ quote, author, role, school, avatar, rating }: ITestimonials['featured'] & {}) => (
    <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-8 @lg:p-12">
            <div className="flex flex-col @lg:flex-row gap-8 items-center">
                <div className="shrink-0">
                    <Avatar className="size-20">
                        <AvatarImage src={avatar} alt={author} />
                        <AvatarFallback className="text-xl">{author.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="space-y-4 text-center @lg:text-left">
                    <StarRating rating={rating} />
                    <blockquote className="text-lg @sm:text-xl font-medium leading-relaxed italic">
                        &ldquo;{quote}&rdquo;
                    </blockquote>
                    <div>
                        <p className="font-semibold">{author}</p>
                        <p className="text-sm text-muted-foreground">{role}, {school}</p>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

const TestimonialsGrid = ({ testimonials }: { testimonials: ITestimonials['testimonials'] }) => (
    <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-6">
        {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} />
        ))}
    </div>
);

const TestimonialCard = ({ quote, author, role, school, avatar, rating }: ITestimonials['testimonials'][number]) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 space-y-4">
            <StarRating rating={rating} />
            <blockquote className="text-sm leading-relaxed">
                &ldquo;{quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3 pt-2">
                <Avatar className="size-10">
                    <AvatarImage src={avatar} alt={author} />
                    <AvatarFallback>{author.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-semibold">{author}</p>
                    <p className="text-xs text-muted-foreground">{role}, {school}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5 mx-auto @lg:mx-1 w-fit">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`size-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} />
        ))}
    </div>
);

// ============= TYPES =============
interface ITestimonials {
    eyebrow: string;
    title: string;
    subtitle: string;
    featured: {
        quote: string;
        author: string;
        role: string;
        school: string;
        avatar: string;
        rating: number;
    };
    testimonials: {
        quote: string;
        author: string;
        role: string;
        school: string;
        avatar: string;
        rating: number;
    }[];
}
