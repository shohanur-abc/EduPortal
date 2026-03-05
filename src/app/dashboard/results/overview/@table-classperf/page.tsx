import { ResultClassPerformanceTable } from "@/features/dashboard/results/overview/@table-classperf"
import { Result } from "@/services/result.service"

export default async function TableClassPerfPage() {
    const data = await Result.classPerformance()
    return <ResultClassPerformanceTable data={data} />
}
