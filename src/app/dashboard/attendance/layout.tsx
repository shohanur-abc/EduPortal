import type { Metadata } from "next"
import { SectionShell } from "@/features/dashboard/components/section-shell"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = {
    title: "Attendance | Dashboard",
    description: "Track and manage student attendance records",
}

const TABS = [
    { label: "Overview", value: "overview", href: ROUTES.dashboard.attendance.overview },
    { label: "Mark Attendance", value: "mark", href: ROUTES.dashboard.attendance.mark },
    { label: "Corrections", value: "corrections", href: ROUTES.dashboard.attendance.corrections },
    { label: "Reports", value: "reports", href: ROUTES.dashboard.attendance.reports },
]

export default function AttendanceLayout({ children }: { children: React.ReactNode }) {
    return (
        <SectionShell title="Attendance" description="Track and manage student attendance" tabs={TABS}>
            {children}
        </SectionShell>
    )
}
