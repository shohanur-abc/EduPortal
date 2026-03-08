import { ResultClassPerformanceTable } from "@/features/dashboard/results/overview/@table-classperf"
import { Result } from "@/services"

export default async function TableClassPerfPage() {
    const data = await Result.getClassPerformance()
    return <ResultClassPerformanceTable data={data} />
}
