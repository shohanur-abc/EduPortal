import type { Metadata } from "next"
import { SectionShell } from "@/features/dashboard/components/section-shell"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = {
    title: "Fees | Dashboard",
    description: "Manage student fee collection, tracking, and statements",
}

const TABS = [
    { label: "Overview", value: "overview", href: ROUTES.dashboard.fees.overview },
    { label: "Collection", value: "collection", href: ROUTES.dashboard.fees.collection },
    // { label: "Tracking", value: "tracking", href: ROUTES.dashboard.fees.tracking },
    { label: "Statements", value: "statements", href: ROUTES.dashboard.fees.statements },
    { label: "Structure", value: "structure", href: ROUTES.dashboard.fees.structure },
]

export default function FeesLayout({ children }: { children: React.ReactNode }) {
    return (
        <SectionShell title="Fees Management" description="Fee collection, tracking, and financial reporting" tabs={TABS}>
            {children}
        </SectionShell>
    )
}
