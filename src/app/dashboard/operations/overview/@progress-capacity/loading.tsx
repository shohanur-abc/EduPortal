import { OperationsCapacityProgress } from "@/features/dashboard/operations/overview/@progress-capacity"
export default function Loading() {
    return <OperationsCapacityProgress data={Array(5).fill(0).map(() => ({ className: "OOOOOO", utilization: 33 }))} loading={true} />
}
