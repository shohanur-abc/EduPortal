import { ResultExamComparisonChart } from "@/features/dashboard/results/overview/@chart-exam"
import { Result } from "@/services/result.service"

export default async function ChartExamPage() {
    const data = await Result.examComparison()
    return <ResultExamComparisonChart data={data} />
}
