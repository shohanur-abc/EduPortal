import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Newsletter({ title, description, inputPlaceholder, buttonText, features }: INewsletter) {
    return (
        <Section>
            <SignupCard
                title={title}
                description={description}
                inputPlaceholder={inputPlaceholder}
                buttonText={buttonText}
                features={features}
            />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const SignupCard = ({ title, description, inputPlaceholder, buttonText, features }: INewsletter) => (
    <Card className="max-w-3xl mx-auto border-primary/20 bg-primary/5">
        <CardHeader className="text-center space-y-3">
            <IconBox />
            <CardTitle className="text-2xl @sm:text-3xl font-bold">{title}</CardTitle>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
            <EmailForm placeholder={inputPlaceholder} buttonText={buttonText} />
            {features && <FeatureList features={features} />}
        </CardContent>
    </Card>
);

const IconBox = () => (
    <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
        <Mail className="size-7 text-primary" />
    </div>
);

const EmailForm = ({ placeholder, buttonText }: { placeholder: string; buttonText: string }) => (
    <div className="flex flex-col @sm:flex-row gap-3 max-w-lg mx-auto w-full">
        <Input
            type="email"
            placeholder={placeholder}
            className="h-12 flex-1"
        />
        <Button size="lg" className="h-12 px-8 shrink-0">
            {buttonText}
        </Button>
    </div>
);

const FeatureList = ({ features }: { features: string[] }) => (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {features.map((feature, i) => (
            <FeatureItem key={i} text={feature} />
        ))}
    </div>
);

const FeatureItem = ({ text }: { text: string }) => (
    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <span className="size-1.5 rounded-full bg-primary" />
        {text}
    </span>
);

// ============= TYPES =============
interface INewsletter {
    title: string;
    description: string;
    inputPlaceholder: string;
    buttonText: string;
    features?: string[];
}
