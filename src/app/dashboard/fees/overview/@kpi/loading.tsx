import { FeeKpi } from "@/features/dashboard/fees/overview/@kpi"

export default function Loading() {
    return <FeeKpi collectionRate={33} monthlyAvg={55555} totalMethods={3} totalRecords={555} loading={true} />
}
