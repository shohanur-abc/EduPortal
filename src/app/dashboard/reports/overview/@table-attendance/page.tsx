import { AttendanceReportTable } from "@/features/dashboard/reports/overview/@table-attendance"
import { Report } from "@/services"

export default async function TableAttendancePage() {
    const data = await Report.attendanceReport()
    return <AttendanceReportTable data={data} />
}
