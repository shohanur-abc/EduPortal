import { OperationsDepartmentChart } from "@/features/dashboard/operations/overview/@chart-department"
import { Teacher } from "@/services/teacher.service"
export default async function Page() {
    const data = await Teacher.departmentDistribution()
    return <OperationsDepartmentChart data={data} />
}
