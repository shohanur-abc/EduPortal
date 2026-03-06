import { OperationsDepartmentChart } from "@/features/dashboard/operations/overview/@chart-department"
import { Teacher } from "@/services"
export default async function Page() {
    const data = await Teacher.departmentDistribution()
    return <OperationsDepartmentChart data={data} />
}
