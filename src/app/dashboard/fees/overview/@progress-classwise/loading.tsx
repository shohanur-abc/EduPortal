import { FeeClassProgress } from "@/features/dashboard/fees/overview/@progress-classwise"

export default function Loading() {
    return <FeeClassProgress data={Array(5).fill(0).map(() => ({ className: "OOOOOO", totalFees: 55555, collected: 55555, pending: 55555, studentCount: 33, collectionRate: 33 }))} loading={true} />
}
