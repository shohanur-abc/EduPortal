import { OperationsGenderChart } from "@/features/dashboard/operations/overview/@chart-gender"
import * as students from "@/services/students"
export default async function Page() {
    const data = await students.genderDistribution()
    return <OperationsGenderChart data={data} />
}
