import { FeeReportTable } from "@/features/dashboard/reports/overview/@table-fees"
import { Report } from "@/services"

export default async function TableFeesPage() {
    const data = await Report.getFee()
    return <FeeReportTable data={data} />
}
