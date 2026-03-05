import { OperationsGradeChart } from "@/features/dashboard/operations/overview/@chart-grade"
export default function Loading() {
    return <OperationsGradeChart data={Array(5).fill(0).map((_, i) => ({ grade: i + 1, sections: 0, totalStudents: 0, totalCapacity: 0 }))} />
}
