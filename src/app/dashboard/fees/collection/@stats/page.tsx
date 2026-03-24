import { FeesCollectionStatCards } from "@/features/dashboard/fees/collection/@stats"
import { Fee } from "@/services"

export const metadata = {
    title: "Fees Collection Stats",
}

export default async function FeesCollectionStatsPage() {
    const breakdown = await Fee.statusBreakdown()

    const totalFees = breakdown.reduce((sum, item) => sum + item.total, 0)
    const totalCollected = breakdown.reduce((sum, item) => sum + item.collected, 0)
    const pendingAmount = Math.max(totalFees - totalCollected, 0)
    const overdueCount = breakdown.find((item) => item.status === "overdue")?.count ?? 0

    return <FeesCollectionStatCards totalFees={totalFees} totalCollected={totalCollected} pendingAmount={pendingAmount} overdueCount={overdueCount} />
}
