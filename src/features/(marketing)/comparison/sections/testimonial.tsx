import { Quote, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function ComparisonTestimonial({ quote, rating, switchedFrom, author }: IComparisonTestimonial) {
    return (
        /* Section-এ @container ক্লাস যোগ করা হয়েছে */
        <Section className="px-4 py-16 md:py-24 @container overflow-hidden">
            <div className="max-w-4xl mx-auto space-y-10 relative">
                {/* ব্যাকগ্রাউন্ডে হালকা গ্রেডিয়েন্ট গ্লো (ঐচ্ছিক) */}
                <div className="absolute -z-10 inset-0 bg-primary/5 blur-3xl rounded-full" />
                
                <div className="flex flex-col items-center space-y-8 relative z-10">
                    <QuoteIcon />
                    
                    <div className="space-y-6 flex flex-col items-center">
                        <SwitchedBadge from={switchedFrom} />
                        <QuoteText text={quote} />
                        <StarRating rating={rating} />
                    </div>

                    <AuthorInfo {...author} />
                </div>
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const QuoteIcon = () => (
    <div className="relative">
        <div className="size-16 @3xl:size-20 rounded-3xl bg-primary/10 flex items-center justify-center rotate-3 group hover:rotate-0 transition-transform duration-500">
            <Quote className="size-8 @3xl:size-10 text-primary -rotate-3 group-hover:rotate-0 transition-transform" />
        </div>
        {/* ডেকোরেশন */}
        <div className="absolute -top-2 -right-2 size-6 bg-yellow-500/20 rounded-full blur-lg" />
    </div>
);

const SwitchedBadge = ({ from }: { from: string }) => (
    <Badge 
        variant="secondary" 
        className="text-xs @3xl:text-sm gap-2 px-4 py-1.5 rounded-full bg-muted/50 border-primary/10 animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        Switched from <span className="font-bold text-foreground underline decoration-primary/30 underline-offset-4">{from}</span>
    </Badge>
);

const QuoteText = ({ text }: { text: string }) => (
    <blockquote className="relative px-4">
        {/* কোটেশন মার্ক ডেকোরেশন */}
        <p className="text-2xl @2xl:text-3xl @4xl:text-4xl font-bold text-center leading-[1.3] text-foreground tracking-tight">
            &ldquo;{text}&rdquo;
        </p>
    </blockquote>
);

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center justify-center gap-1.5 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-border/40 shadow-sm">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                className={`size-5 @3xl:size-6 ${
                    i < rating 
                    ? 'text-yellow-500 fill-yellow-500 drop-shadow-sm' 
                    : 'text-muted-foreground/20 fill-muted-foreground/10'
                }`}
            />
        ))}
    </div>
);

const AuthorInfo = ({ name, role, school, avatar }: IComparisonTestimonial['author']) => (
    <div className="flex flex-col items-center gap-4 pt-4 border-t border-dashed border-border/60 w-full max-w-xs">
        <Avatar className="size-14 @3xl:size-16 border-2 border-background shadow-xl ring-2 ring-primary/10">
            <AvatarImage src={avatar} alt={name} className="object-cover" />
            <AvatarFallback className="bg-primary/5 text-primary font-bold">
                {getInitials(name)}
            </AvatarFallback>
        </Avatar>
        <div className="text-center space-y-0.5">
            <p className="text-lg font-bold text-foreground tracking-tight">{name}</p>
            <p className="text-xs @3xl:text-sm font-medium text-muted-foreground">
                {role} <span className="text-primary/40 mx-1">•</span> {school}
            </p>
        </div>
    </div>
);

// ============= HELPERS =============
const getInitials = (name: string) =>
    name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

// ============= TYPES =============
interface IComparisonTestimonial {
    quote: string;
    rating: number;
    switchedFrom: string;
    author: {
        name: string;
        role: string;
        school: string;
        avatar: string;
    };
}