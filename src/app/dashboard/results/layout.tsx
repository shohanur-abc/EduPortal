import type { Metadata } from "next"
import { SectionShell } from "@/features/dashboard/components/section-shell"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = {
    title: "Results | Dashboard",
    description: "Manage exam results, grades, and academic performance",
}

const TABS = [
    { label: "Overview", value: "overview", href: ROUTES.dashboard.results.overview },
    { label: "Enter Results", value: "enter", href: ROUTES.dashboard.results.enter },
    { label: "View Results", value: "view", href: ROUTES.dashboard.results.view },
    { label: "Report Cards", value: "report-cards", href: ROUTES.dashboard.results.reportCards },
    { label: "Analytics", value: "analytics", href: ROUTES.dashboard.results.analytics },
]

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
    return (
        <SectionShell title="Results" description="Exam results, grades, and academic performance" tabs={TABS}>
            {children}
        </SectionShell>
    )
}
