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
}: {
    stats: React.ReactNode
    kpi: React.ReactNode
    table: React.ReactNode
    "table-expiring": React.ReactNode
    "chart-priority": React.ReactNode
    "chart-audience": React.ReactNode
    "chart-trend": React.ReactNode
    comparison: React.ReactNode
    "progress-status": React.ReactNode
    summary: React.ReactNode
}) {
    return (
        <>
            {stats}
            {kpi}
            {table}
            {tableExpiring}
            {chartPriority}
            {chartAudience}
            {chartTrend}
            {comparison}
            {progressStatus}
            {summary}
        </>
    )
}
