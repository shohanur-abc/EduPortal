import { ReactNode } from "react"

export default function ReportsOverviewLayout({
    stats,
    kpi,
    "chart-attendance": chartAttendance,
    "chart-fees": chartFees,
    "chart-results": chartResults,
    "table-attendance": tableAttendance,
    "table-fees": tableFees,
    "table-results": tableResults,
    summary,
    comparison,
}: {
    stats: ReactNode
    kpi: ReactNode
    "chart-attendance": ReactNode
    "chart-fees": ReactNode
    "chart-results": ReactNode
    "table-attendance": ReactNode
    "table-fees": ReactNode
    "table-results": ReactNode
    summary: ReactNode
    comparison: ReactNode
}) {
    return (
        <div className="space-y-6">
            {/* Row 1 — Stat cards */}
            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">{stats}</div>

            {/* Row 2 — KPI metric cards */}
            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">{kpi}</div>

            {/* Row 3 — Attendance: chart + table */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {chartAttendance}
                {tableAttendance}
            </div>

            {/* Row 4 — Fees: chart + table */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {chartFees}
                {tableFees}
            </div>

            {/* Row 5 — Results: chart + table */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {chartResults}
                {tableResults}
            </div>

            {/* Row 6 — Summary + comparison */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {summary}
                {comparison}
            </div>
        </div>
    )
}
