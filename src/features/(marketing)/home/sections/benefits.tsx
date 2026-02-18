import { ArrowRight, CheckCircle2, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Benefits({ eyebrow, title, subtitle, roles }: IBenefits) {
    return (
        <Section>
            <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
            <RolesGrid roles={roles} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const RolesGrid = ({ roles }: { roles: IBenefits['roles'] }) => (
    <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-4 gap-6">
        {roles.map((role, i) => (
            <RoleCard key={i} {...role} />
        ))}
    </div>
);

const RoleCard = ({ icon: Icon, role, tagline, benefits, href }: IBenefits['roles'][number]) => (
    <Card className="group flex flex-col hover:shadow-lg transition-shadow">
        <CardHeader>
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Icon className="size-6 text-primary" />
            </div>
            <Badge variant="secondary" className="w-fit mb-2">{role}</Badge>
            <CardTitle className="text-base">{tagline}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
            <ul className="space-y-2">
                {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>
            <Button variant="ghost" size="sm" className="group-hover:text-primary p-0" asChild>
                <Link href={href}>
                    Learn more <ArrowRight className="ml-1 size-3" />
                </Link>
            </Button>
        </CardContent>
    </Card>
);

// ============= TYPES =============
interface IBenefits {
    eyebrow: string;
    title: string;
    subtitle: string;
    roles: {
        icon: LucideIcon;
        role: string;
        tagline: string;
        benefits: string[];
        href: string;
    }[];
}
