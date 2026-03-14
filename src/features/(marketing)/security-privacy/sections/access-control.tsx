import { type LucideIcon } from '@/lib/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function AccessControl({ eyebrow, title, subtitle, roles }: IAccessControl) {
    return (
        <Section cols={3} eyebrow={eyebrow} title={title} subtitle={subtitle}>
            {roles.map((role, i) => (
                <RoleCard key={i} {...role} />
            ))}
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
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
