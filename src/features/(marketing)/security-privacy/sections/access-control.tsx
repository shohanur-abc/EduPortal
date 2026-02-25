import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function AccessControl({ eyebrow, title, subtitle, roles }: IAccessControl) {
    return (
        /* Using @container for precise layout scaling based on section width.
           Adding background subtle pattern or tint for a professional feel.
        */
        <Section className="px-4 py-16 md:py-24 @container overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12 @3xl:space-y-16">
                <div className="text-center">
                    <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
                </div>
                
                {/* Responsive grid for roles */}
                <RoleGrid roles={roles} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const RoleGrid = ({ roles }: { roles: IRoleItem[] }) => (
    /* Optimized Grid Strategy:
       - Default: 1 column
       - @sm to @3xl: 2 columns (better for permission badges)
       - @5xl: 3 columns (standard desktop)
       - @7xl: 3 columns with wider gaps
    */
    <div className="grid grid-cols-1 @sm:grid-cols-2 @5xl:grid-cols-3 gap-6 @3xl:gap-8">
        {roles.map((role, i) => (
            <RoleCard key={i} {...role} />
        ))}
    </div>
);

const RoleCard = ({ icon: Icon, role, description, permissions }: IRoleItem) => (
    /* Interactive Card design with consistent padding and scaling */
    <Card className="group h-full flex flex-col hover:border-primary/50 hover:shadow-md transition-all duration-300 border-border/60 bg-card">
        <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
                <IconBox icon={Icon} />
                <div className="space-y-1">
                    <CardTitle className="text-lg @3xl:text-xl font-bold tracking-tight text-foreground leading-none">
                        {role}
                    </CardTitle>
                    <CardDescription className="text-xs @3xl:text-sm text-muted-foreground italic-none">
                        {description}
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="mt-auto">
            {/* Displaying permissions as a modern wrap-around tag cloud */}
            <PermissionList permissions={permissions} />
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    /* Scales size based on container to maintain visual hierarchy */
    <div className="size-12 @3xl:size-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <Icon className="size-6 @3xl:size-7 text-primary" />
    </div>
);

const PermissionList = ({ permissions }: { permissions: string[] }) => (
    <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40 mt-2">
        {permissions.map((permission, i) => (
            <Badge 
                key={i} 
                variant="secondary" 
                className="text-[10px] @3xl:text-xs font-medium bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
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