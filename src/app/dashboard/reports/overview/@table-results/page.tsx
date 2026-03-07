import { ResultReportTable } from "@/features/dashboard/reports/overview/@table-results"
import { Report } from "@/services"

export default async function TableResultsPage() {
    const data = await Report.resultReport()
    return <ResultReportTable data={data} />
}
