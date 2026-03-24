import { SummaryGrid } from "@/components/molecules/summary-grid"

export function FeeSummary({ totalFees, collected, pending, collectionRate, loading }: FeeSummaryProps & { loading?: boolean }) {
    return (
        <SummaryGrid
            // title="Fee Collection Snapshot"
            items={[
                { label: "Total Fees", value: `৳${totalFees.toLocaleString()}` },
                { label: "Collected", value: `৳${collected.toLocaleString()}` },
                { label: "Pending", value: `৳${pending.toLocaleString()}` },
                { label: "Collection Rate", value: `${collectionRate}%` },
            ]}
            loading={loading}
            columns={1}
            className="max-w-xs"
        />
    )
}

interface FeeSummaryProps {
    totalFees: number
    collected: number
    pending: number
    collectionRate: number
}
