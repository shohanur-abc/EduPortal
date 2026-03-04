import { FeeSummary } from "@/features/dashboard/fees/overview/@summary"

export default function Loading() {
    return <FeeSummary totalFees={55555} collected={55555} pending={55555} collectionRate={33} loading={true} />
}
