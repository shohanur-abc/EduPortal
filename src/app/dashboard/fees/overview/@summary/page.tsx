import { FeeSummary } from "@/features/dashboard/fees/overview/@summary"
import { Fee } from "@/services"

export default async function SummaryPage() {
    const totals = await Fee.feeTotals()
    const collectionRate = totals.total > 0 ? Math.round((totals.collected / totals.total) * 100 * 10) / 10 : 0

    return (
        <FeeSummary
            totalFees={totals.total}
            collected={totals.collected}
            pending={totals.total - totals.collected}
            collectionRate={collectionRate}
        />
    )
}
