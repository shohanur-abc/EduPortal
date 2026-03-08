import type { Metadata } from "next"
import { SectionShell } from "@/features/dashboard/components/section-shell"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = {
    title: "Notice Board | Dashboard",
    description: "Create, manage, and track notices for your school community",
}

const TABS = [
    { label: "Manage", value: "manage", href: ROUTES.dashboard.notices.manage },
    { label: "Create", value: "create", href: ROUTES.dashboard.notices.create },
    { label: "Overview", value: "overview", href: ROUTES.dashboard.notices.overview },
]

export default function NoticesLayout({ children }: { children: React.ReactNode }) {
    return (
        <SectionShell title="Notice Board" description="Create, manage, and distribute notices" tabs={TABS}>
            {children}
        </SectionShell>
    )
}
