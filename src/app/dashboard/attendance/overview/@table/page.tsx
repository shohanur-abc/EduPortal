import { AttendanceRecordsTable } from "@/features/dashboard/attendance/overview/@table";
import * as attendance from "@/services/attendence";

export default async function DataTablePage() {
    const data = await attendance.getRecent()
    return <AttendanceRecordsTable recentRecords={data} />
}