import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Notice Overview | Dashboard",
    description: "Comprehensive overview of all notices with charts, tables, and analytics",
}

export interface NoticeOverviewLayoutProps {
    stats?: ReactNode
    kpi?: ReactNode
    table?: ReactNode
    "chart-priority"?: ReactNode
    "chart-trend"?: ReactNode
    "chart-audience"?: ReactNode
    "table-expiring"?: ReactNode
    summary?: ReactNode
}

export default function NoticeOverviewLayout({
    stats,
    kpi,
    table,
    "chart-priority": chartPriority,
    "chart-trend": chartTrend,
    "chart-audience": chartAudience,
    "table-expiring": tableExpiring,
    summary,
}: NoticeOverviewLayoutProps) {
    return (
        <div className="col-span-full grid grid-cols-12 gap-4">

            {/* Row 1: Stats — full width */}
            <div className="col-span-full grid grid-cols-2 gap-4 @xl:grid-cols-4">
                {stats}
            </div>

            {/* Row 2: Trend (9) + KPI (3) */}
            <div className="col-span-full @3xl:col-span-9">
                {chartTrend}
            </div>
            <div className="col-span-full @3xl:col-span-3 grid grid-cols-2 gap-4 @3xl:grid-cols-1">
                {kpi}
            </div>

            {/* Row 3: Summary + Priority (3) + Table (9) */}
            <div className="col-span-full @3xl:col-span-4 @5xl:col-span-3 grid grid-cols-1 gap-4">
                <div>{summary}</div>
                <div>{chartPriority}</div>
            </div>
            <div className="col-span-full @3xl:col-span-8 @5xl:col-span-9">
                {table}
            </div>

        </div>
    )
}
