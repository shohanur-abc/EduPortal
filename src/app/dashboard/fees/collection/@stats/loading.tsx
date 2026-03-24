import { FeesCollectionStatCards } from "@/features/dashboard/fees/collection/@stats"

export default function FeesCollectionStatsLoading() {
    return <FeesCollectionStatCards totalFees={0} totalCollected={0} pendingAmount={0} overdueCount={0}  />
}
