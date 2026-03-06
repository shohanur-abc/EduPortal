import { ResultReportChart } from "@/features/dashboard/reports/overview/@chart-results"
import * as reports from "@/services/reports"

export default async function ChartResultsPage() {
    const data = await reports.resultReport()
    return <ResultReportChart data={data} />
}
