import { FeeReportTable } from "@/features/dashboard/reports/overview/@table-fees"
import * as reports from "@/services/reports"

export default async function TableFeesPage() {
    const data = await reports.feeReport()
    return <FeeReportTable data={data} />
}
