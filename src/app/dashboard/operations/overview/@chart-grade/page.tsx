import { OperationsGradeChart } from "@/features/dashboard/operations/overview/@chart-grade"
import { Class } from "@/services"
export default async function Page() {
    const data = await Class.getGradeDistribution()
    return <OperationsGradeChart data={data} />
}
