import type { Metadata } from "next"
import { SectionShell } from "@/features/dashboard/components/section-shell"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = {
    title: "Attendance | Dashboard",
    description: "Track and manage student and staff attendance records",
}

const TABS = [
    { label: "Overview", value: "overview", href: ROUTES.dashboard.attendance.overview },
    { label: "Student", value: "student", href: ROUTES.dashboard.attendance.student },
    { label: "Staff", value: "staff", href: ROUTES.dashboard.attendance.staff },
]

export default function AttendanceLayout({ children }: { children: React.ReactNode }) {
    return (
        <SectionShell title="Attendance" description="Track and manage student and staff attendance" tabs={TABS}>
            {children}
        </SectionShell>
    )
}
