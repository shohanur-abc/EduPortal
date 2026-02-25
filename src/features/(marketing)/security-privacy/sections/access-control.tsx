import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';

// ============= MAIN COMPONENT =============
export default function AccessControl({ eyebrow, title, subtitle, roles }: IAccessControl) {
    return (
        /* Surgical precision with @container for responsiveness across all tiers (3XS-7XL).
           Padding scales to maintain visual balance on micro and ultra-wide displays.
        */
        <Section className="px-4 py-12 @xs:py-16 @lg:py-24 @container overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-10 @3xl:space-y-16">
                <div className="text-center px-2">
                    <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
                </div>
                
                {/* Responsive grid for access roles */}
                <RoleGrid roles={roles} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const RoleGrid = ({ roles }: { roles: IRoleItem[] }) => (
    /* Adaptive Grid Strategy:
       - @3xs to @xs: 1 column (Ensures badges don't overflow on tiny screens)
       - @sm to @4xl: 2 columns (Balanced layout for tablets and laptops)
       - @5xl to @7xl: 3 columns (Optimized for desktop readability)
    */
    <div className={cn(
        "grid gap-4 @sm:gap-6 @3xl:gap-8",
        "grid-cols-1",
        "@sm:grid-cols-2",
        "@5xl:grid-cols-3"
    )}>
        {roles.map((role, i) => (
            <RoleCard key={i} {...role} />
        ))}
    </div>
);

const RoleCard = ({ icon: Icon, role, description, permissions }: IRoleItem) => (
    /* Preserved original effects with responsive scaling for text and padding */
    <Card className="group h-full flex flex-col hover:border-primary/50 hover:shadow-md transition-all duration-300 border-border/60 bg-card">
        <CardHeader className="pb-4 pt-6 @3xl:pt-8">
            <div className="flex items-center gap-4">
                <IconBox icon={Icon} />
                <div className="space-y-1">
                    <CardTitle className="text-base @sm:text-lg @3xl:text-xl @7xl:text-2xl font-bold tracking-tight text-foreground leading-none">
                        {role}
                    </CardTitle>
                    <CardDescription className="text-[10px] @sm:text-xs @3xl:text-sm text-muted-foreground italic-none">
                        {description}
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="mt-auto pb-6 @3xl:pb-8">
            {/* Tag cloud layout for permissions with responsive gap and padding */}
            <PermissionList permissions={permissions} />
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    /* Icon scaling from 3XS through 7XL viewports */
    <div className="size-11 @3xl:size-14 @7xl:size-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <Icon className="size-5 @3xl:size-7 @7xl:size-8 text-primary" />
    </div>
);

const PermissionList = ({ permissions }: { permissions: string[] }) => (
    /* Flexible badge container with responsive typography */
    <div className="flex flex-wrap gap-1.5 @3xl:gap-2 pt-4 border-t border-border/40">
        {permissions.map((permission, i) => (
            <Badge 
                key={i} 
                variant="secondary" 
                className="text-[9px] @sm:text-[10px] @3xl:text-xs font-medium bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
            >
                {permission}
            </Badge>
        ))}
    </div>
);

// ============= TYPES =============
interface IRoleItem {
    icon: LucideIcon;
    role: string;
    description: string;
    permissions: string[];
}

interface IAccessControl {
    eyebrow: string;
    title: string;
    subtitle: string;
    roles: IRoleItem[];
}