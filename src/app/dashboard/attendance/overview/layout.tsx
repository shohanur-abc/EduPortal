import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Attendance Overview",
    description: "Comprehensive attendance overview with charts, tables, and analytics",
}

export default function AttendanceOverview({
    stats,
    kpi,
    chart,
    "chart-trend": chartTrend,
    "chart-monthly": chartMonthly,
    table,
    "table-classwise": tableClasswise,
    "table-absentees": tableAbsentees,
    "progress-classwise": progressClasswise,
    summary,
    comparison,
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

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">{table}</div>
                <div className="lg:col-span-1">{chart}</div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {chartTrend}
                {chartMonthly}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">{tableClasswise}</div>
                <div className="lg:col-span-1">{progressClasswise}</div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {tableAbsentees}
                {comparison}
            </div>
        </div>
    )
}


