import { OperationsSubjectCoverageTable } from "@/features/dashboard/operations/overview/@table-subjects"
import { Teacher } from "@/services"
export default async function Page() {
    const data = await Teacher.subjectCoverage()
    return <OperationsSubjectCoverageTable data={data} />
}
