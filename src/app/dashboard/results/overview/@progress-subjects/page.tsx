import { ResultSubjectProgress } from "@/features/dashboard/results/overview/@progress-subjects"
import { Result } from "@/services/result.service"

export default async function ProgressSubjectsPage() {
    const data = await Result.subjectWisePerformance()
    return <ResultSubjectProgress data={data} />
}
