import { OperationsDepartmentChart } from "@/features/dashboard/operations/overview/@chart-department"
export default function Loading() {
    return <OperationsDepartmentChart data={[{ department: "OOO", count: 0 }]} />
}
