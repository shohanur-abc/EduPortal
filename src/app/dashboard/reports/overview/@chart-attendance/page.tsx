import { AttendanceReportChart } from "@/features/dashboard/reports/overview/@chart-attendance"
import { Report } from "@/services"

export default async function ChartAttendancePage() {
    const data = await Report.getReport()
    return <AttendanceReportChart data={data} />
}
