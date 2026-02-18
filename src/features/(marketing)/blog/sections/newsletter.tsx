import { Mail, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/section';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';

// ============= MAIN COMPONENT =============
export default function Newsletter({ title, description, inputPlaceholder, buttonText, benefits, disclaimer }: INewsletter) {
    return (
        <Section>
            <NewsletterCard
                title={title}
                description={description}
                inputPlaceholder={inputPlaceholder}
                buttonText={buttonText}
                benefits={benefits}
                disclaimer={disclaimer}
            />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const NewsletterCard = ({ title, description, inputPlaceholder, buttonText, benefits, disclaimer }: INewsletter) => (
    <Card className="max-w-xl mx-auto py-0 border-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <CardContent className="grid grid-cols-1 gap-10 px-4 py-8 @lg:p-12">
            <ContentSide title={title} description={description} benefits={benefits} />
            <FormSide inputPlaceholder={inputPlaceholder} buttonText={buttonText} disclaimer={disclaimer} />
        </CardContent>
    </Card>
);

const ContentSide = ({ title, description, benefits }: Pick<INewsletter, 'title' | 'description' | 'benefits'>) => (
    <div className="space-y-6 flex flex-col justify-center">
        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Mail className="size-7 text-primary" />
        </div>
        <h2 className="text-2xl @sm:text-3xl @3xl:text-4xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        <BenefitsList benefits={benefits} />
    </div>
);

const BenefitsList = ({ benefits }: { benefits: string[] }) => (
    <ul className="space-y-2">
        {benefits.map((benefit, i) => (
            <li key={i} className="flex center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="size-4 mt-0.5 text-primary shrink-0" />
                <span>{benefit}</span>
            </li>
        ))}
    </ul>
);

const FormSide = ({ inputPlaceholder, buttonText, disclaimer }: Pick<INewsletter, 'inputPlaceholder' | 'buttonText' | 'disclaimer'>) => (
    <div className="flex flex-col justify-center gap-4">
        <div >
            <InputGroup>

                <InputGroupInput
                    type="email"
                    placeholder={inputPlaceholder}
                />
                <InputGroupAddon> <Mail /></InputGroupAddon>
                <InputGroupButton variant="default" className='h-full px-4'>
                    {buttonText}
                </InputGroupButton>
            </InputGroup>
        </div>
        <p className="text-xs text-muted-foreground text-center">{disclaimer}</p>
    </div>
);

// ============= TYPES =============
interface INewsletter {
    title: string;
    description: string;
    inputPlaceholder: string;
    buttonText: string;
    benefits: string[];
    disclaimer: string;
}
