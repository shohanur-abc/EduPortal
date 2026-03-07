import { ResultReportChart } from "@/features/dashboard/reports/overview/@chart-results"
import { Report } from "@/services"

export default async function ChartResultsPage() {
    const data = await Report.resultReport()
    return <ResultReportChart data={data} />
}
