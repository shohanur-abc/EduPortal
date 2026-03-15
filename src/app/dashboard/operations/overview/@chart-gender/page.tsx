import { OperationsGenderChart } from "@/features/dashboard/operations/overview/@chart-gender"
import { Student } from "@/services/student.service"
export default async function Page() {
    const data = await Student.genderDistribution()
    return <OperationsGenderChart data={data} />
}
