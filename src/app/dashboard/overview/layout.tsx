import { SectionShell } from "@/features/dashboard/components/section-shell"
import { ReactNode } from "react"

export default function DashboardOverviewLayout({ stats, chart, table }: { stats: ReactNode; chart: ReactNode; table: ReactNode }) {
    return (
        <SectionShell title="Attendance" description="Track and manage student attendance">
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
                    {stats}
                </div>
                <div className="grid grid-cols-1 gap-6 @xl:grid-cols-3">
                    <div className="col-span-1 @xl:col-span-2">{table}</div>
                    <div className="col-span-1 @xl:col-span-1">{chart}</div>
                </div>
            </div>
        </SectionShell>
    )
}