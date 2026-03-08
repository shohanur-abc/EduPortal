import { OperationsSubjectCoverageTable } from "@/features/dashboard/operations/overview/@table-subjects"
import { Teacher } from "@/services"
export default async function Page() {
    const data = await Teacher.getSubjectCoverage()
    return <OperationsSubjectCoverageTable data={data} />
}
