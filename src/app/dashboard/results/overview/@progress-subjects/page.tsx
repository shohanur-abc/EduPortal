import { ResultSubjectProgress } from "@/features/dashboard/results/overview/@progress-subjects"
import * as results from "@/services/results"

export default async function ProgressSubjectsPage() {
    const data = await results.subjectWisePerformance()
    return <ResultSubjectProgress data={data} />
}
