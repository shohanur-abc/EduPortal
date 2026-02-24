import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function ContactForm({ eyebrow, title, subtitle, card }: IContactForm) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <FormCard {...card} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const FormCard = ({ heading, description, fields, subjectOptions, submitLabel }: IContactFormCard) => (
    <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>{heading}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
                {fields.map((field, i) => (
                    <FormField key={i} {...field} subjectOptions={subjectOptions} />
                ))}
            </div>
            <div className="mt-6">
                <Button className="w-full">{submitLabel}</Button>
            </div>
        </CardContent>
    </Card>
);

const FormField = ({ label, name, type, placeholder, required, colSpan, subjectOptions }: IContactFormField & { subjectOptions?: IContactFormCard['subjectOptions'] }) => (
    <div className={colSpan === 2 ? '@md:col-span-2' : ''}>
        <Label htmlFor={name} className="mb-2">
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
        </Label>
        {type === 'textarea' ? (
            <Textarea id={name} name={name} placeholder={placeholder} rows={5} />
        ) : type === 'select' ? (
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {subjectOptions?.map((option, i) => (
                        <SelectItem key={i} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        ) : (
            <Input id={name} name={name} type={type} placeholder={placeholder} />
        )}
    </div>
);

// ============= TYPES =============
interface IContactForm {
    eyebrow: string;
    title: string;
    subtitle: string;
    card: IContactFormCard;
}

interface IContactFormCard {
    heading: string;
    description: string;
    fields: IContactFormField[];
    subjectOptions: { label: string; value: string }[];
    submitLabel: string;
}

interface IContactFormField {
    label: string;
    name: string;
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
    placeholder: string;
    required?: boolean;
    colSpan?: 1 | 2;
}
