import { ResultExamComparisonChart } from "@/features/dashboard/results/overview/@chart-exam"
import { Result } from "@/services"

export default async function ChartExamPage() {
    const data = await Result.getExamComparison()
    return <ResultExamComparisonChart data={data} />
}
