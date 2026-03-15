import type { Metadata } from "next"
import { SectionShell } from "@/features/dashboard/components/section-shell"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = {
    title: "Operations | Dashboard",
    description: "Manage classes, staff, students, and academic operations",
}

const TABS = [
    { label: "Overview", value: "overview", href: ROUTES.dashboard.operations.overview },
    // { label: "Calendar", value: "calendar", href: ROUTES.dashboard.operations.calendar },
    { label: "Classes", value: "classes", href: ROUTES.dashboard.operations.classes },
    { label: "Staff", value: "staff", href: ROUTES.dashboard.operations.staff },
    { label: "Students", value: "students", href: ROUTES.dashboard.operations.students },
    // { label: "Settings", value: "settings", href: ROUTES.dashboard.operations.settings },
]

export default function OperationsLayout({ children }: { children: React.ReactNode }) {
    return (
        <SectionShell title="Operations" description="Classes, staff, students, and academic operations" tabs={TABS}>
            {children}
        </SectionShell>
    )
}
