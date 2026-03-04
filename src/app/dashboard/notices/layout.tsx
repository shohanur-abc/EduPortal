import type { Metadata } from "next"
import { SectionShell } from "@/features/dashboard/components/section-shell"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = {
    title: "Notices | Dashboard",
    description: "Manage announcements and communications",
}

const TABS = [
    { label: "Overview", value: "overview", href: ROUTES.dashboard.notices.overview },
    { label: "Manage", value: "manage", href: ROUTES.dashboard.notices.manage },
    { label: "Publish", value: "publish", href: ROUTES.dashboard.notices.publish },
    { label: "Analytics", value: "analytics", href: ROUTES.dashboard.notices.analytics },
]

export default function NoticesLayout({ children }: { children: React.ReactNode }) {
    return (
        <SectionShell title="Notices" description="Announcements and communications" tabs={TABS}>
            {children}
        </SectionShell>
    )
}
