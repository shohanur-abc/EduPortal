import { SectionShell } from "@/features/dashboard/components/section-shell"
import type { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Overview",
    description: "School dashboard overview",
}

export default function DashboardOverviewLayout({
    hero,
    performance,
    activity,
    assignments,
    sidebar,
}: {
    hero: ReactNode
    performance: ReactNode
    activity: ReactNode
    assignments: ReactNode
    sidebar: ReactNode
}) {
    return (
        <SectionShell title="Overview" description="Track attendance, academics, and communication">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                <div className="space-y-4 xl:col-span-9">
                    {hero}
                    {performance}
                    {activity}
                    {assignments}
                </div>
                <div className="xl:col-span-3">{sidebar}</div>
            </div>
        </SectionShell>
    )
}