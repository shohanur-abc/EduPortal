import { OperationsGradeChart } from "@/features/dashboard/operations/overview/@chart-grade"
import { Class } from "@/services"
export default async function Page() {
    const data = await Class.gradeDistribution()
    return <OperationsGradeChart data={data} />
}
