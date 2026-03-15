import type { LucideIcon } from '@/lib/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Departments({ eyebrow, title, subtitle, departments }: IDepartments) {
    return (
        <Section cols={4} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {departments.map((dept, i) => (
                <DepartmentCard key={i} {...dept} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const DepartmentCard = ({ icon: Icon, name, description, email, availability, ctaLabel }: IDepartments['departments'][0]) => (
    <Card>
        <CardHeader className="space-y-3">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="size-5 text-primary" />
            </div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
            <div className="space-y-1">
                <a href={`mailto:${email}`} className="text-sm text-primary hover:underline block">
                    {email}
                </a>
                <p className="text-xs text-muted-foreground">{availability}</p>
            </div>
            {ctaLabel && (
                <Button variant="outline" size="sm" className="w-full">
                    {ctaLabel}
                </Button>
            )}
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IDepartments {
    eyebrow: string;
    title: string;
    subtitle: string;
    departments: {
        icon: LucideIcon;
        name: string;
        description: string;
        email: string;
        availability: string;
        ctaLabel?: string;
    }[];
}

