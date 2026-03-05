import { SummaryGrid } from "@/components/molecules/summary-grid"

export function ResultSummary({ avgMarks, passRate, totalResults, topSubject, loading }: ResultSummaryProps & { loading?: boolean }) {
    return (
        <SummaryGrid
            title="Results Snapshot"
            items={[
                { label: "Avg Marks", value: `${avgMarks}%` },
                { label: "Pass Rate", value: `${passRate}%` },
                { label: "Total Results", value: totalResults.toLocaleString() },
                { label: "Top Subject", value: topSubject },
            ]}
            columns={4}
            loading={loading}
        />
    )
}

interface ResultSummaryProps {
    avgMarks: number
    passRate: number
    totalResults: number
    topSubject: string
}
