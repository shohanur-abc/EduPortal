import { AttendanceReportTable } from "@/features/dashboard/attendance/reports/@table"
import * as attendance from "@/services/attendence"

export default async function ReportTablePage() {
    const records = await attendance.getAll()
    return <AttendanceReportTable records={records} />
}
