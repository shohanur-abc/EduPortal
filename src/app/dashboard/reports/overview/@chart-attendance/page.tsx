import { AttendanceReportChart } from "@/features/dashboard/reports/overview/@chart-attendance"
import { Report } from "@/services/report.service"

export default async function ChartAttendancePage() {
    const data = await Report.attendanceReport()
    return <AttendanceReportChart data={data} />
}
