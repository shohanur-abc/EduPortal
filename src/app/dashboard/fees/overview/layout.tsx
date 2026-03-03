import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Fees Overview",
    description: "Comprehensive fee management overview with collection analytics",
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
}: Record<string, ReactNode>) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
                {stats}
            </div>

            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
                {kpi}
            </div>

            {summary}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {chart}
                {tableOverdue}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {chartCollection}
                {chartMethods}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">{tableDefaulters}</div>
                <div className="lg:col-span-1">{progressClasswise}</div>
            </div>

            {tablePayments}
        </div>
    )
}
