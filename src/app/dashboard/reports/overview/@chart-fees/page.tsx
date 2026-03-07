import { FeeReportChart } from "@/features/dashboard/reports/overview/@chart-fees"
import { Report } from "@/services"

export default async function ChartFeesPage() {
    const data = await Report.feeReport()
    return <FeeReportChart data={data} />
}
