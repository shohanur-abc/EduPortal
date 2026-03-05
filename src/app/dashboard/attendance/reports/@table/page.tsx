import { AttendanceReportTable } from "@/features/dashboard/attendance/reports/@table"
import { Attendance } from "@/services/attendance.service"

export default async function ReportTablePage() {
    const records = await Attendance.getAll()
    return <AttendanceReportTable records={records} />
}
