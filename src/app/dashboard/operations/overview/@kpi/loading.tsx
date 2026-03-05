import { OperationsKpi } from "@/features/dashboard/operations/overview/@kpi"
export default function Loading() {
    return <OperationsKpi totalCapacity={555} utilization={33} totalSubjects={33} avgClassSize={33} loading={true} />
}
