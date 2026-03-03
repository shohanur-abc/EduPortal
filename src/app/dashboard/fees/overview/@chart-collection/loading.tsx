import { FeeMonthlyCollectionChart } from "@/features/dashboard/fees/overview/@chart-collection"

export default function Loading() {
    return <FeeMonthlyCollectionChart data={Array(6).fill(0).map(() => ({ month: "OOO", total: 0, count: 0 }))} />
}
