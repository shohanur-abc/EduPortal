import { ResultSubjectProgress } from "@/features/dashboard/results/overview/@progress-subjects"
import { Result } from "@/services"

export default async function ProgressSubjectsPage() {
    const data = await Result.subjectWisePerformance()
    return <ResultSubjectProgress data={data} />
}
