import { AttendanceReportTable } from "@/features/dashboard/attendance/reports/@table"
import { Attendance as attendance } from "@/services"

export default async function ReportTablePage() {
    const records = await attendance.getAll()
    return <AttendanceReportTable records={records} />
}
