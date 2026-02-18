import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function DemoForm({ eyebrow, title, subtitle, form }: IDemoForm) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <FormCard form={form} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const FormCard = ({ form }: { form: IDemoForm['form'] }) => (
    <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold">{form.heading}</CardTitle>
            {form.description && (
                <CardDescription>{form.description}</CardDescription>
            )}
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
                {form.fields.map((field, i) => (
                    <FormField key={i} {...field} />
                ))}
                {form.selectField && (
                    <SelectField {...form.selectField} />
                )}
            </div>
            <SubmitButton text={form.submitLabel} />
        </CardContent>
    </Card>
);

const FormField = ({ label, placeholder, type = 'text', fullWidth }: IFormField) => (
    <div className={fullWidth ? 'col-span-full' : ''}>
        <Label className="text-sm font-medium mb-1.5 block">{label}</Label>
        <Input type={type} placeholder={placeholder} />
    </div>
);

const SelectField = ({ label, placeholder, options, fullWidth }: ISelectField) => (
    <div className={fullWidth ? 'col-span-full' : ''}>
        <Label className="text-sm font-medium mb-1.5 block">{label}</Label>
        <Select>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option, i) => (
                    <SelectItem key={i} value={option.value}>{option.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);

const SubmitButton = ({ text }: { text: string }) => (
    <div className="mt-6">
        <Button size="lg" className="w-full rounded-full">
            {text}
            <ArrowRight className="ml-2 size-4" />
        </Button>
    </div>
);

// ============= TYPES =============
interface IDemoForm {
    eyebrow: string;
    title: string;
    subtitle: string;
    form: {
        heading: string;
        description?: string;
        fields: IFormField[];
        selectField?: ISelectField;
        submitLabel: string;
    };
}

interface IFormField {
    label: string;
    placeholder: string;
    type?: string;
    fullWidth?: boolean;
}

interface ISelectField {
    label: string;
    placeholder: string;
    options: { label: string; value: string }[];
    fullWidth?: boolean;
}
