import type { Metadata } from "next"
import { SectionShell } from "@/features/dashboard/components/section-shell"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = {
    title: "Reports | Dashboard",
    description: "Generate and analyze institutional reports",
}

const TABS = [
    { label: "Overview", value: "overview", href: ROUTES.dashboard.reports.overview },
    { label: "Standard", value: "standard", href: ROUTES.dashboard.reports.standard },
    { label: "Custom", value: "custom", href: ROUTES.dashboard.reports.custom },
    { label: "Analytics", value: "analytics", href: ROUTES.dashboard.reports.analytics },
]

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
    return (
        <SectionShell title="Reports" description="Generate and analyze institutional reports" tabs={TABS}>
            {children}
        </SectionShell>
    )
}
