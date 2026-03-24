import type { Metadata } from "next"
import { SectionShell } from "@/features/dashboard/components/section-shell"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = {
    title: "Users | Dashboard",
    description: "Manage exam results, grades, and academic performance",
}

const TABS = [
    { label: "Overview", value: "overview", href: ROUTES.dashboard.users.overview },
    // { label: "Admin", value: "admin", href: ROUTES.dashboard.users.admin },
    // { label: "Report Cards", value: "report-cards", href: ROUTES.dashboard.users.reportCards },
]

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
    return (
        <SectionShell title="Users" description="Manage user accounts and permissions" tabs={TABS}>
            {children}
        </SectionShell>
    )
}
