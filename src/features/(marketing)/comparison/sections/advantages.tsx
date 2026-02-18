import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Advantages({ eyebrow, title, subtitle, advantages }: IAdvantages) {
    return (
        /* Section-এ @container ক্লাস যোগ করা হয়েছে যাতে চাইল্ড এলিমেন্টগুলো 
           প্যারেন্ট সেকশনের উইথ (width) অনুযায়ী রেসপন্সিভ হয়। 
        */
        <Section className="px-4 py-10 md:px-6 lg:px-8 @container">
            <div className="max-w-7xl mx-auto space-y-10">
                <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
                <AdvantagesGrid advantages={advantages} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const AdvantagesGrid = ({ advantages }: { advantages: IAdvantages['advantages'] }) => (
    /* পরিবর্তন: @ ব্রেকপয়েন্ট ব্যবহার করা হয়েছে। 
       - grid-cols-1: কন্টেইনার ছোট থাকলে ১ কলাম।
       - @2xl:grid-cols-2: কন্টেইনার 42rem পার হলে ২ কলাম।
       - @5xl:grid-cols-3: কন্টেইনার আরও বড় হলে ৩ কলাম।
    */
    <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-5 @lg:gap-6 @4xl:gap-8">
        {advantages.map((advantage, i) => (
            <AdvantageCard key={i} {...advantage} />
        ))}
    </div>
);

const AdvantageCard = ({ icon: Icon, title, description }: IAdvantages['advantages'][number]) => (
    <Card className="group h-full transition-all duration-300 hover:shadow-xl hover:border-primary/30 border-border/60">
        <CardContent className="p-6 @lg:p-8 flex flex-col items-start gap-4">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                <Icon className="size-6 text-primary" />
            </div>
            <div className="space-y-2">
                {/* টেক্সট সাইজও এখন কন্টেইনার অনুযায়ী পরিবর্তন হবে */}
                <h3 className="text-xl @3xl:text-2xl font-bold text-foreground leading-tight">
                    {title}
                </h3>
                <p className="text-sm @3xl:text-base text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IAdvantages {
    eyebrow: string;
    title: string;
    subtitle: string;
    advantages: {
        icon: LucideIcon;
        title: string;
        description: string;
    }[];
}