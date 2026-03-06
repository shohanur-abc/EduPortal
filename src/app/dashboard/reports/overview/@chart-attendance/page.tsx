import { AttendanceReportChart } from "@/features/dashboard/reports/overview/@chart-attendance"
import * as reports from "@/services/reports"

export default async function ChartAttendancePage() {
    const data = await reports.attendanceReport()
    return <AttendanceReportChart data={data} />
}
