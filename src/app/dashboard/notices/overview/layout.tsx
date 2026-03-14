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
        <div className="space-y-6">
            {/* Status Stat Cards */}
            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
                {stats}
            </div>

            {/* KPI Metrics */}
            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
                {kpi}
            </div>

            {/* Summary Snapshot */}
            {summary}

            {/* Table + Priority Chart */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">{table}</div>
                <div className="lg:col-span-1">{chartPriority}</div>
            </div>

            {/* Trend + Audience Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {chartTrend}
                {chartAudience}
            </div>

            {/* Expiring Table + Activity Feed */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {tableExpiring}
            </div>
        </div>
    )
}
