import { type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function AccessControl({ eyebrow, title, subtitle, roles }: IAccessControl) {
    return (
        <Section eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <RoleGrid roles={roles} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const RoleGrid = ({ roles }: { roles: IRoleItem[] }) => (
    <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-6">
        {roles.map((role, i) => (
            <RoleCard key={i} {...role} />
        ))}
    </div>
);

const RoleCard = ({ icon: Icon, role, description, permissions }: IRoleItem) => (
    <Card className="group hover:border-primary/50 hover:shadow-md transition-all">
        <CardHeader>
            <div className="flex items-center gap-3">
                <IconBox icon={Icon} />
                <div>
                    <CardTitle className="text-lg">{role}</CardTitle>
                    <CardDescription className="text-xs">{description}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <PermissionList permissions={permissions} />
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <Icon className="size-6 text-primary" />
    </div>
);

const PermissionList = ({ permissions }: { permissions: string[] }) => (
    <div className="flex flex-wrap gap-2">
        {permissions.map((permission, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
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
