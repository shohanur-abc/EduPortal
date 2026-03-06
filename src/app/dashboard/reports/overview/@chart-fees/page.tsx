import { FeeReportChart } from "@/features/dashboard/reports/overview/@chart-fees"
import * as reports from "@/services/reports"

export default async function ChartFeesPage() {
    const data = await reports.feeReport()
    return <FeeReportChart data={data} />
}
