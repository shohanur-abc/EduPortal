import { OperationsStudentStatusComparison } from "@/features/dashboard/operations/overview/@comparison"
import { Student } from "@/services"
export default async function Page() {
    const data = await Student.getStatusBreakdown()
    return <OperationsStudentStatusComparison data={data.map(d => ({
        label: d.status.charAt(0).toUpperCase() + d.status.slice(1),
        value: d.count,
        color: d.status === "active" ? "var(--chart-1)" : d.status === "inactive" ? "var(--chart-5)" : "var(--chart-3)",
    }))} />
}
