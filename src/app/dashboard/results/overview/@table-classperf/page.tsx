import { ResultClassPerformanceTable } from "@/features/dashboard/results/overview/@table-classperf"
import * as results from "@/services/results"

export default async function TableClassPerfPage() {
    const data = await results.classPerformance()
    return <ResultClassPerformanceTable data={data} />
}
