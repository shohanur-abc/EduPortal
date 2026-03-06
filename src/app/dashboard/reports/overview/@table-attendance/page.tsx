import { AttendanceReportTable } from "@/features/dashboard/reports/overview/@table-attendance"
import * as reports from "@/services/reports"

export default async function TableAttendancePage() {
    const data = await reports.attendanceReport()
    return <AttendanceReportTable data={data} />
}
