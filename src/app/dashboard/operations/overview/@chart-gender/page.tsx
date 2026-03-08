import { OperationsGenderChart } from "@/features/dashboard/operations/overview/@chart-gender"
import { Student } from "@/services"
export default async function Page() {
    const data = await Student.getGenderDistribution()
    return <OperationsGenderChart data={data} />
}
