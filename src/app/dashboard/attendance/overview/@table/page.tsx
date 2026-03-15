import { AttendanceRecordsTable } from "@/features/dashboard/attendance/overview/@table";
import { Attendance as attendance } from "@/services";

export default async function DataTablePage() {
    const data = await attendance.getRecent()
    return <AttendanceRecordsTable recentRecords={data} />
}