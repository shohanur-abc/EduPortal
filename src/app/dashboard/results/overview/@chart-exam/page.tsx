import { ResultExamComparisonChart } from "@/features/dashboard/results/overview/@chart-exam"
import * as results from "@/services/results"

export default async function ChartExamPage() {
    const data = await results.examComparison()
    return <ResultExamComparisonChart data={data} />
}
