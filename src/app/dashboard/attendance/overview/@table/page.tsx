import { AttendanceRecordsTable } from "@/features/dashboard/attendance/overview/@table";
import { Attendance } from "@/services/attendance.service";

export default async function DataTablePage() {
    const data = await Attendance.getRecent()
    return <AttendanceRecordsTable recentRecords={data} />
}