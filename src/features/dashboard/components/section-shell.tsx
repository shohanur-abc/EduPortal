import { PageHeader } from "@/components/molecules/page-header"
import { TabsNav } from "@/components/molecules/tabs-nav"

// ============= COMPONENT =============
export function SectionShell({ title, description, tabs, children, actions }: SectionShellProps) {
    return (
        <div className="space-y-6">
            {tabs && <TabsNav tabs={tabs} />}
            {children}
        </div>
    )
}

// ============= TYPES =============
interface SectionShellProps {
    title?: string
    description?: string
    tabs?: { label: string; value: string; href: string }[]
    children: React.ReactNode
    actions?: React.ReactNode
}
