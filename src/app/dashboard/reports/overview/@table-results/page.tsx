import { ResultReportTable } from "@/features/dashboard/reports/overview/@table-results"
import * as reports from "@/services/reports"

export default async function TableResultsPage() {
    const data = await reports.resultReport()
    return <ResultReportTable data={data} />
}
