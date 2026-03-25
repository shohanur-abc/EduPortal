import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Fees Overview",
    description: "Comprehensive fee management overview with collection analytics",
}

interface LayoutProps {
    stats: ReactNode
    kpi: ReactNode
    chart: ReactNode
    "chart-collection": ReactNode
    "chart-methods": ReactNode
    "table-payments": ReactNode
    "table-overdue": ReactNode
    "table-defaulters": ReactNode
    "progress-classwise": ReactNode
    summary: ReactNode
}

export default function FeesOverviewLayout({
    stats,
    kpi,
    chart,
    "chart-collection": chartCollection,
    "chart-methods": chartMethods,
    "table-payments": tablePayments,
    "table-overdue": tableOverdue,
    "table-defaulters": tableDefaulters,
    "progress-classwise": progressClasswise,
    summary,
}: LayoutProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-12 gap-4 items-stretch ">
                <div className="col-span-full grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
                    {stats}
                </div>
                <div className="col-span-9">{chartCollection}</div>
                <div className="col-span-3">{summary}</div>
                <div className="col-span-full">
                    <div className="grid grid-cols-4 gap-4">{kpi}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {chart}
                {tableOverdue}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 h-125">
                <div className="lg:col-span-2">{tableDefaulters}</div>
                <div className="lg:col-span-1  overflow-y-auto">{progressClasswise}</div>
            </div>

            {tablePayments}
        </div>
    )
}
