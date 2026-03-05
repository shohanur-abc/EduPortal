import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Notices Overview",
    description: "Comprehensive notice management overview with analytics",
}

export interface NoticesOverviewLayoutProps {
    stats?: ReactNode
    kpi?: ReactNode
    table?: ReactNode
    "table-expiring"?: ReactNode
    "chart-priority"?: ReactNode
    "chart-audience"?: ReactNode
    "chart-trend"?: ReactNode
    comparison?: ReactNode
    "progress-status"?: ReactNode
    summary?: ReactNode
}

export default function NoticesOverviewLayout({
    stats,
    kpi,
    table,
    "table-expiring": tableExpiring,
    "chart-priority": chartPriority,
    "chart-audience": chartAudience,
    "chart-trend": chartTrend,
    comparison,
    "progress-status": progressStatus,
    summary,
}: NoticesOverviewLayoutProps) {
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
                {chartPriority}
                {chartAudience}
            </div>

            {chartTrend}

            {table}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">{tableExpiring}</div>
                <div className="lg:col-span-1">{progressStatus}</div>
            </div>

            {comparison}
        </div>
    )
}
